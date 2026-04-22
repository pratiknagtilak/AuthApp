import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

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
        
        <section class="products-section">
          <h2>Available Products</h2>
          <div *ngIf="loading" class="loading">Loading products...</div>
          <div *ngIf="!loading && products.length === 0" class="no-products">No products available.</div>
          
          <div *ngIf="!loading && products.length > 0" class="products-grid">
            <div *ngFor="let product of products" class="product-card">
              <h3>{{ product.name }}</h3>
              <p class="price">$ {{ product.price | number: '1.2-2' }}</p>
            </div>
          </div>
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
      .products-section {
        margin-top: 2rem;
      }
      .products-section h2 {
        margin-top: 0;
      }
      .loading, .no-products {
        padding: 2rem;
        text-align: center;
        color: #666;
        font-size: 1.1rem;
      }
      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
        margin-top: 1rem;
      }
      .product-card {
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1.5rem;
        transition: all 0.3s ease;
      }
      .product-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-4px);
      }
      .product-card h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
      }
      .price {
        font-size: 1.25rem;
        font-weight: 600;
        color: #3f51b5;
        margin: 0;
      }
    `
  ]
})
export class ProductsComponent implements OnInit {
  userRole = localStorage.getItem('userRole') ?? 'User';
  products: Product[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
