import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApprovalRequest {
  id: number;

  user: number;

  user_name: string;
  user_email: string;
  user_department: string;
  user_job_title: string;

  form_code: string;

  department: string;
  department_email: string;

  reason: string;

  submission_data: Record<string, any>;

  status: 'PENDING' | 'APPROVED' | 'REJECTED';

  submitted_at: string;

  reviewed_at: string | null;

  reviewed_by: number | null;

  reviewed_by_name: string;

  approver_comment: string;
}


export interface ApprovalStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  today: number;
}


@Injectable({
  providedIn: 'root'
})
export class AccessControlService {

  private readonly baseUrl =
    'http://localhost:8000/api/v1/access';


  constructor(
    private http: HttpClient
  ) {}


  getApprovalRequests(
    status?: string,
    department?: string,
    formCode?: string,
    search?: string
  ): Observable<ApprovalRequest[]> {

    let params = new HttpParams();

    if (status) {
      params = params.set(
        'status',
        status
      );
    }

    if (department) {
      params = params.set(
        'department',
        department
      );
    }

    if (formCode) {
      params = params.set(
        'form_code',
        formCode
      );
    }

    if (search) {
      params = params.set(
        'search',
        search
      );
    }

    return this.http.get<ApprovalRequest[]>(
      `${this.baseUrl}/admin/requests/`,
      {
        params,
        withCredentials: true
      }
    );
  }


  getApprovalRequest(
    requestId: number
  ): Observable<ApprovalRequest> {

    return this.http.get<ApprovalRequest>(
      `${this.baseUrl}/admin/requests/${requestId}/`,
      {
        withCredentials: true
      }
    );
  }


  getApprovalStats(): Observable<ApprovalStats> {

    return this.http.get<ApprovalStats>(
      `${this.baseUrl}/admin/stats/`,
      {
        withCredentials: true
      }
    );
  }


  approveApprovalRequest(
    requestId: number,
    comment: string = ''
  ): Observable<ApprovalRequest> {

    return this.http.post<ApprovalRequest>(
      `${this.baseUrl}/admin/requests/${requestId}/approve/`,
      {
        approver_comment: comment
      },
      {
        withCredentials: true
      }
    );
  }


  rejectApprovalRequest(
    requestId: number,
    comment: string = ''
  ): Observable<ApprovalRequest> {

    return this.http.post<ApprovalRequest>(
      `${this.baseUrl}/admin/requests/${requestId}/reject/`,
      {
        approver_comment: comment
      },
      {
        withCredentials: true
      }
    );
  }
}