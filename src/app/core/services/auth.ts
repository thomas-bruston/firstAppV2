import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUser, ILoginRequest, ILoginResponse,IRefreshRequest,IRefreshResponse } from '../models/auth.model';


@Injectable({
  providedIn: 'root',
})

export class Auth{
private readonly http = inject(HttpClient);
private readonly apiUrl = 'https://dummyjson.com/auth';

login(credentials:ILoginRequest) : Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.apiUrl}/login`, credentials);}

refreshToken(credentials:IRefreshRequest) : Observable<IRefreshResponse>{
        return this.http.post<IRefreshResponse>(`${this.apiUrl}/refresh`, credentials);
}

getCurrentUser() : Observable<IAuthUser>{
return this.http.get<IAuthUser>(
    `${this.apiUrl}/me`)}



  }

