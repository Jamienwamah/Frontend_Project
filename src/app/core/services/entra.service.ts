import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntraProfileResponse } from '../models/entra-profile.model';

@Injectable({
  providedIn: 'root'
})
export class EntraService {
  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:8000/api/v1/entra';

  getMyProfile(): Observable<EntraProfileResponse> {
    return this.http.get<EntraProfileResponse>(
      `${this.API_URL}/me/`,
      { withCredentials: true }
    );
  }
}