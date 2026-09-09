import { signalStore, withState, withMethods, withComputed, withHooks } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { IAuthUser, ILoginRequest,ILoginResponse,IRefreshRequest,IRefreshResponse } from '../models/auth.model';
import { Auth } from '../services/auth';

interface AuthState{
    currentUser : IAuthUser | null;
    accessToken : string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState : AuthState = {
    currentUser : null,
    accessToken : null,
    refreshToken : null,
    loading: false,
    error: null,
}

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

withComputed((store) => ({
    isAuthenticated: computed(()=> !!store.accessToken())})),

withMethods((store) => ({
  logout(): void {
    patchState(store, { currentUser: null, accessToken: null, refreshToken: null, loading: false });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
})),

withMethods((store, authService = inject(Auth)) => ({

  login: rxMethod<ILoginRequest>(
    pipe(
      tap(() => patchState(store, { loading: true, error: null })),
      switchMap((credentials) =>
        authService.login(credentials).pipe(
          tap({
            next: (response) => { 
                const { accessToken, refreshToken, ...profile } = response;
                patchState(store, {
                currentUser: profile,
                accessToken : response.accessToken,
                refreshToken : response.refreshToken,
                loading : false,
                
            });
            localStorage.setItem('accessToken',accessToken)
            localStorage.setItem('refreshToken',refreshToken)
            },
            error: (error) => patchState(store, {
              error: error.message,
              loading: false
            })
          })
        )
      )
    )
  ),

    refreshToken: rxMethod<IRefreshRequest>(
    pipe(
      tap(() => patchState(store, { loading: true, error: null })),
      switchMap((credentials) =>
        authService.refreshToken(credentials).pipe(
          tap({
            next: (response) => { 
                const { accessToken, refreshToken,} = response;
                patchState(store, {
                accessToken : response.accessToken,
                refreshToken : response.refreshToken,
                loading : false,
                
            });
            localStorage.setItem('accessToken',accessToken)
            localStorage.setItem('refreshToken',refreshToken)
            },
            error: (error) => {
            store.logout();
            patchState(store, { error: error.message });
            }
          })
        )
      )
    )
  ),

  getCurrentUser: rxMethod<void>(
  pipe(
    tap(() => patchState(store, { loading: true, error: null })),
    switchMap(() =>
      authService.getCurrentUser().pipe(
        tap({
          next: (user) => patchState(store, { currentUser: user, loading: false }),
          error: (error) => {
            store.logout();
            patchState(store, { error: error.message });
          }
        })
      )
    )
  )
),

})),

 withHooks({
    onInit(store) {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if ( accessToken && refreshToken ){
            patchState(store, { accessToken, refreshToken});
            store.getCurrentUser();
        }
    },
 })
);
