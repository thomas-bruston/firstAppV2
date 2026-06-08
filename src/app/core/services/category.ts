import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { IProductsResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/products';
 

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(slug: string, limit = 10, skip = 0): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(
      `${this.apiUrl}/category/${slug}?limit=${limit}&skip=${skip}`
    );
  }

}
