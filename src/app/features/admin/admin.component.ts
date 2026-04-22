import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userRole = localStorage.getItem('userRole') ?? 'Admin';
  products: Product[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';
  newProduct: Partial<Product> = {};

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

  createProduct(): void {
    if (!this.newProduct.name || !this.newProduct.price) {
      this.errorMessage = 'Product name and price are required';
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.productService.createProduct(this.newProduct as Product).subscribe({
      next: () => {
        this.successMessage = 'Product created successfully!';
        this.newProduct = {};
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.successMessage = 'Product deleted successfully!';
          this.loadProducts();
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
