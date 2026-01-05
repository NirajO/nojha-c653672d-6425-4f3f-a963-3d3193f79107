import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSignal = signal<string | null>(
    localStorage.getItem('access_token')
  );

  // ⚠️ change later when API is ready
  private readonly API_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  // =========================
  // Auth API
  // =========================

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          this.setToken(res.accessToken);
        })
      );
  }

  logout() {
    this.clearToken();
  }

  // =========================
  // Token handling
  // =========================

  setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.tokenSignal.set(token);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  clearToken() {
    localStorage.removeItem('access_token');
    this.tokenSignal.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSignal();
  }
}
