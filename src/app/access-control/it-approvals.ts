import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AccessControlService,
  ApprovalRequest
} from './access-control.service';

@Component({
  selector: 'app-it-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './it-approvals.html',
  styleUrl: './it-approvals.css'
})
export class ITApprovalsComponent implements OnInit {
  requests: ApprovalRequest[] = [];

  loading = true;
  selectedStatus = 'PENDING';

  processingId: number | null = null;

  comments: Record<number, string> = {};

  constructor(private accessService: AccessControlService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;

    this.accessService.getApprovalRequests(this.selectedStatus).subscribe({
      next: requests => {
        this.requests = requests;
        this.loading = false;
      },
      error: error => {
        console.error('Unable to load approval requests:', error);
        this.requests = [];
        this.loading = false;
      }
    });
  }

  approve(request: ApprovalRequest): void {
    this.processingId = request.id;

    const comment = this.comments[request.id] || '';

    this.accessService
      .approveApprovalRequest(request.id, comment)
      .subscribe({
        next: () => {
          delete this.comments[request.id];
          this.processingId = null;
          this.loadRequests();
        },
        error: error => {
          console.error('Approval failed:', error);
          this.processingId = null;
        }
      });
  }

  reject(request: ApprovalRequest): void {
    this.processingId = request.id;

    const comment = this.comments[request.id] || '';

    this.accessService
      .rejectApprovalRequest(request.id, comment)
      .subscribe({
        next: () => {
          delete this.comments[request.id];
          this.processingId = null;
          this.loadRequests();
        },
        error: error => {
          console.error('Rejection failed:', error);
          this.processingId = null;
        }
      });
  }

  changeStatus(): void {
    this.loadRequests();
  }

  getComment(requestId: number): string {
    return this.comments[requestId] || '';
  }

  setComment(requestId: number, value: string): void {
    this.comments[requestId] = value;
  }
}