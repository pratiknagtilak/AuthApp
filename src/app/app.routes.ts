import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { AdminComponent } from './features/admin/admin.component';
import { ProductsComponent } from './features/products/products.component';
import { ServerErrorComponent } from './features/errors/server-error.component';
import { NotFoundComponent } from './features/errors/not-found.component';
import { ForbiddenComponent } from './features/errors/forbidden.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: 'login' }
];
