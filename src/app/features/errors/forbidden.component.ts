import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  template: `
    <div class="error-page">
      <div class="error-container">
        <div class="error-code">403</div>
        <h1>Access Forbidden</h1>
        <p class="error-message">You don't have permission to access this resource.</p>
        <button class="btn btn-primary" (click)="goHome()">Go to Home</button>
      </div>
    </div>
  `,
  styles: [
    `
      .error-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        padding: 1rem;
      }

      .error-container {
        text-align: center;
        background: white;
        padding: 3rem 2rem;
        border-radius: 12px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        max-width: 500px;
      }

      .error-code {
        font-size: 5rem;
        font-weight: 900;
        color: #fa709a;
        margin-bottom: 1rem;
        opacity: 0.9;
      }

      h1 {
        font-size: 2rem;
        color: #2d3748;
        margin-bottom: 0.5rem;
      }

      .error-message {
        color: #718096;
        font-size: 1.1rem;
        margin-bottom: 2rem;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-primary {
        background: #fa709a;
        color: white;
      }

      .btn-primary:hover {
        background: #f85c7d;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(250, 112, 154, 0.4);
      }
    `
  ]
})
export class ForbiddenComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigateByUrl('/login');
  }
}
