import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(res => {
        if (res.data?.token) {
          localStorage.setItem('fp_token', res.data.token);
        }
      })
    );
  }

  register(email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { email, password, role }).pipe(
      tap(res => {
        if (res.data?.token) {
          localStorage.setItem('fp_token', res.data.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('fp_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('fp_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
