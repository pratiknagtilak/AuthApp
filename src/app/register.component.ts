import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, RegisterDto } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <h1>Register</h1>
      <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
        <label>
          Username
          <input type="text" name="username" [(ngModel)]="dto.username" required />
        </label>

        <label>
          Email
          <input type="email" name="email" [(ngModel)]="dto.email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" [(ngModel)]="dto.password" required minlength="6" />
        </label>

        <button type="submit" [disabled]="registerForm.invalid">Register</button>
      </form>

      <div class="message" *ngIf="message">{{ message }}</div>
      <div class="error" *ngIf="error">{{ error }}</div>

      <p>
        Already have an account?
        <a routerLink="/login">Login</a>
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
export class RegisterComponent {
  dto: RegisterDto = {
    username: '',
    email: '',
    password: ''
  };

  message = '';
  error = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.message = '';
    this.error = '';

    this.authService.register(this.dto).subscribe({
      next: (result) => {
        this.message = 'User registered successfully!';
      },
      error: (err) => {
        this.error = err?.error?.message || err?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
