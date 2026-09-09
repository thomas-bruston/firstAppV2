import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthStore } from '../store/auth.store';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const authService = inject(Auth);
  const router = inject(Router);
  const accessToken = store.accessToken();

  const clonedReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const currentRefreshToken = store.refreshToken();

      if (error.status === 401 && currentRefreshToken) {
        return authService.refreshToken({ refreshToken: currentRefreshToken }).pipe(
          switchMap((response) => {
            store.setTokens(response.accessToken, response.refreshToken);

            const retriedReq = clonedReq.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` }
            });

            return next(retriedReq);
          }),
          catchError(() => {
            store.logout();
            router.navigate(['/login']);
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
