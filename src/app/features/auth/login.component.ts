import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginDto } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <h1>Login</h1>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <label>
          Email
          <input type="email" name="email" [(ngModel)]="dto.email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" [(ngModel)]="dto.password" required />
        </label>

        <button type="submit" [disabled]="loginForm.invalid">Login</button>
      </form>

      <p>
        Need an account?
        <a routerLink="/register">Register</a>
      </p>
    </div>
  `,
  styles: [
    `
      .auth-page {
        width: min(480px, 100%);
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
      }
      h1 {
        margin-bottom: 1.5rem;
        font-size: 1.75rem;
      }
      form {
        display: grid;
        gap: 1rem;
      }
      label {
        display: grid;
        gap: 0.5rem;
        font-weight: 600;
      }
      input {
        width: 100%;
        padding: 0.75rem 0.9rem;
        border: 1px solid #ccc;
        border-radius: 0.75rem;
        font: inherit;
      }
      button {
        width: 100%;
        padding: 0.9rem 1rem;
        border: none;
        border-radius: 0.75rem;
        background: #3f51b5;
        color: white;
        font-weight: 700;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.65;
        cursor: not-allowed;
      }
      .message,
      .error {
        margin-top: 1rem;
        padding: 0.9rem 1rem;
        border-radius: 0.75rem;
      }
      .message {
        background: #e8f5e9;
        color: #2e7d32;
      }
      .error {
        background: #ffebee;
        color: #c62828;
      }
      p {
        margin-top: 1rem;
      }
      a {
        color: #3f51b5;
        text-decoration: none;
      }
    `
  ]
})
export class LoginComponent {
  dto: LoginDto = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.dto).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        const role = this.authService.getRoleFromToken(response.accessToken);
        localStorage.setItem('userRole', role ?? '');

        const targetRoute = role === 'Admin' ? '/admin' : '/products';
        this.router.navigateByUrl(targetRoute);
      }
    });
  }
}
