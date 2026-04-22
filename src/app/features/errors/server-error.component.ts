import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  template: `
    <div class="error-page">
      <div class="error-container">
        <div class="error-code">500</div>
        <h1>Server Error</h1>
        <p class="error-message">Something went wrong. We're working to fix it.</p>
        <div class="button-group">
          <button class="btn btn-primary" (click)="retry()">Retry</button>
          <button class="btn btn-secondary" (click)="goHome()">Navigate to Home</button>
        </div>
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
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        color: #667eea;
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

      .button-group {
        display: flex;
        gap: 1rem;
        justify-content: center;
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
        background: #667eea;
        color: white;
      }

      .btn-primary:hover {
        background: #5568d3;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }

      .btn-secondary {
        background: #e2e8f0;
        color: #2d3748;
      }

      .btn-secondary:hover {
        background: #cbd5e0;
        transform: translateY(-2px);
      }
    `
  ]
})
export class ServerErrorComponent {
  constructor(private router: Router) {}

  retry(): void {
    window.location.reload();
  }

  goHome(): void {
    this.router.navigateByUrl('/login');
  }
}
