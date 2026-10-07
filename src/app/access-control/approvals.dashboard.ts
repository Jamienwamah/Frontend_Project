import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import {
  AccessControlService,
  ApprovalRequest,
  ApprovalStats
} from './access-control.service';

@Component({
  selector: 'app-approval-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approval-dashboard.html',
  styleUrl: './approval-dashboard.css'
})
export class ApprovalDashboardComponent implements OnInit {
  requests: ApprovalRequest[] = [];

  stats: ApprovalStats = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    today: 0
  };

  loading = true;
  refreshing = false;
  refreshClicked = false;

  selectedStatus = '';
  selectedDepartment = '';
  selectedForm = '';
  searchTerm = '';

  selectedRequest: ApprovalRequest | null = null;

  processingId: number | null = null;

  comment = '';

  errorMessage = '';
  successMessage = '';

  constructor(private accessService: AccessControlService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    console.log('LOAD DASHBOARD CALLED:', new Date().toISOString());

    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      stats: this.accessService.getApprovalStats(),
      requests: this.accessService.getApprovalRequests(
        this.selectedStatus,
        this.selectedDepartment,
        this.selectedForm,
        this.searchTerm
      )
    }).subscribe({
      next: result => {
        console.log('REQUEST DATA:', result.requests);
        console.log('REQUEST COUNT:', result.requests.length);

        this.stats = result.stats;
        this.requests = result.requests;

        console.log('COMPONENT REQUESTS:', this.requests);

        this.loading = false;
      },

      error: error => {
        console.error('APPROVAL DASHBOARD ERROR:', error);

        this.requests = [];
        this.loading = false;

        this.errorMessage =
          error?.error?.detail ||
          'Unable to load approval dashboard.';
      }
    });
  }

  /**
   * Refresh the dashboard without refreshing the browser.
   * Keeps the current search/filter selections.
   * Shows × for 2 seconds after clicking.
   */
  refreshDashboard(): void {
    if (this.refreshClicked) {
      return;
    }

    console.log('REFRESH DASHBOARD CLICKED:', new Date().toISOString());

    this.refreshClicked = true;
    this.refreshing = true;
    this.errorMessage = '';
    this.successMessage = '';

    forkJoin({
      stats: this.accessService.getApprovalStats(),
      requests: this.accessService.getApprovalRequests(
        this.selectedStatus,
        this.selectedDepartment,
        this.selectedForm,
        this.searchTerm
      )
    }).subscribe({
      next: result => {
        console.log('REFRESHED REQUEST DATA:', result.requests);
        console.log('REFRESHED REQUEST COUNT:', result.requests.length);

        this.stats = result.stats;
        this.requests = result.requests;

        console.log('REFRESHED COMPONENT REQUESTS:', this.requests);

        this.refreshing = false;

        setTimeout(() => {
          this.refreshClicked = false;
        }, 2000);
      },

      error: error => {
        console.error('DASHBOARD REFRESH ERROR:', error);

        this.refreshing = false;

        this.errorMessage =
          error?.error?.detail ||
          'Unable to refresh approval dashboard.';

        setTimeout(() => {
          this.refreshClicked = false;
        }, 2000);
      }
    });
  }

  loadStats(): void {
    this.accessService.getApprovalStats().subscribe({
      next: stats => {
        this.stats = stats;
      },

      error: error => {
        console.error(
          'Unable to load approval statistics:',
          error
        );
      }
    });
  }

  loadRequests(): void {
    this.loading = true;
    this.errorMessage = '';

    this.accessService.getApprovalRequests(
      this.selectedStatus,
      this.selectedDepartment,
      this.selectedForm,
      this.searchTerm
    ).subscribe({
      next: requests => {
        this.requests = requests;
        this.loading = false;
      },

      error: error => {
        console.error(
          'Unable to load approval requests:',
          error
        );

        this.requests = [];
        this.loading = false;

        this.errorMessage =
          error?.error?.detail ||
          'Unable to load approval requests.';
      }
    });
  }

  applyFilters(): void {
    this.loadRequests();
  }

  clearFilters(): void {
    this.selectedStatus = '';
    this.selectedDepartment = '';
    this.selectedForm = '';
    this.searchTerm = '';

    this.loadRequests();
  }

  openRequest(request: ApprovalRequest): void {
    this.selectedRequest = request;
    this.comment = request.approver_comment || '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeRequest(): void {
    this.selectedRequest = null;
    this.comment = '';
  }

  approve(request: ApprovalRequest): void {
    if (request.status !== 'PENDING') {
      return;
    }

    this.processingId = request.id;
    this.errorMessage = '';
    this.successMessage = '';

    this.accessService.approveApprovalRequest(
      request.id,
      this.comment
    ).subscribe({
      next: updatedRequest => {
        this.processingId = null;
        this.successMessage = 'Request approved successfully.';
        this.selectedRequest = updatedRequest;

        this.loadDashboard();
      },

      error: error => {
        console.error('Approval failed:', error);

        this.processingId = null;

        this.errorMessage =
          error?.error?.detail ||
          'Unable to approve request.';
      }
    });
  }

  reject(request: ApprovalRequest): void {
    if (request.status !== 'PENDING') {
      return;
    }

    this.processingId = request.id;
    this.errorMessage = '';
    this.successMessage = '';

    this.accessService.rejectApprovalRequest(
      request.id,
      this.comment
    ).subscribe({
      next: updatedRequest => {
        this.processingId = null;
        this.successMessage = 'Request rejected successfully.';
        this.selectedRequest = updatedRequest;

        this.loadDashboard();
      },

      error: error => {
        console.error('Rejection failed:', error);

        this.processingId = null;

        this.errorMessage =
          error?.error?.detail ||
          'Unable to reject request.';
      }
    });
  }

  getAccessForDetails(
    request: ApprovalRequest
  ): {
    name: string;
    email: string;
    department: string;
  } {

    const submissionData: any =
      request.submission_data || {};

    const accessFor =
      submissionData.verifiedAccessFor;

    return {
      name:
        accessFor?.name ||
        submissionData.accessFor?.name ||
        '—',

      email:
        accessFor?.email ||
        submissionData.accessFor?.email ||
        '—',

      department:
        accessFor?.department ||
        request.department ||
        '—'
    };
  }

  getRequesterDetails(
    request: ApprovalRequest
  ): {
    name: string;
    email: string;
    department: string;
  } {

    const submissionData: any =
      request.submission_data || {};

    const requester =
      submissionData.verifiedRequester;

    return {
      name:
        requester?.name ||
        request.user_name ||
        '—',

      email:
        requester?.email ||
        request.user_email ||
        '—',

      department:
        requester?.department ||
        request.user_department ||
        '—'
    };
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  formatFormName(formCode: string): string {
    const names: Record<string, string> = {
      'OST-ENCLUSIA-ACCESS': 'Enclusia Access',
      'OST-ISSUE': 'OST Issue',
      'OST-TROUBLESHOOTING': 'OST Troubleshooting',
      'OGCM-REPLACEMENT': 'OGCM Device Replacement',
      'OGCM-TROUBLESHOOTING': 'OGCM Device Troubleshooting',
      'OGCM-INFRASTRUCTURE': 'OGCM Infrastructure',
      'OGFS-REPLACEMENT': 'OGFS Device Replacement',
      'OGFS-TROUBLESHOOTING': 'OGFS Device Troubleshooting',
      'OGFS-INFRASTRUCTURE': 'OGFS Infrastructure'
    };

    return names[formCode] || formCode;
  }

  getSubmissionEntries(
    request: ApprovalRequest
  ): { key: string; value: any }[] {
    if (!request.submission_data) {
      return [];
    }

    return Object.entries(request.submission_data).map(
      ([key, value]) => ({
        key,
        value
      })
    );
  }

  formatValue(value: any): string {
    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return '—';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }
}