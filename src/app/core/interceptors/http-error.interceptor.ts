import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Attach the access token to the Authorization header
  const token = localStorage.getItem('accessToken');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      const status = error.status;

      switch (status) {
        case 500:
          router.navigateByUrl('/server-error');
          break;
        case 404:
          router.navigateByUrl('/not-found');
          break;
        case 401:
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userRole');
          router.navigateByUrl('/login');
          break;
        case 403:
          router.navigateByUrl('/forbidden');
          break;
        default:
          // For other errors, rethrow so components can handle them
          throw error;
      }

      // Return empty observable to prevent component error handlers from firing
      return EMPTY;
    })
  );
};
