import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <nav class="navbar">
        <h2>Products</h2>
        <button (click)="logout()">Logout</button>
      </nav>
      <main class="content">
        <h1>Welcome, User</h1>
        <p>Role: {{ userRole }}</p>
        <section>
          <h2>Products List</h2>
          <p>Product list coming soon...</p>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
      .dashboard {
        min-height: 100vh;
        background: #f0f2f5;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background: #3f51b5;
        color: white;
      }
      .navbar h2 {
        margin: 0;
      }
      .navbar button {
        padding: 0.5rem 1rem;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
      }
      .content {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      }
    `
  ]
})
export class ProductsComponent {
  userRole = localStorage.getItem('userRole') ?? 'User';

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
