import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductsResponse } from '../models/api-response.model';
import { IProduct, IProductCreate, IProductUpdate } from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class Product {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/products';

getAll(limit=10 , skip=0) : Observable<IProductsResponse>{
  return this.http.get<IProductsResponse>(
    `${this.apiUrl}?limit=${limit}&skip=${skip}`
  )
}

getById(id:number) : Observable<IProduct>{
  return this.http.get<IProduct>(
    `${this.apiUrl}/${id}`

  )
}

search(query:string) : Observable<IProductsResponse>{
return this.http.get<IProductsResponse>(
  `${this.apiUrl}/search?q=${query}`
)
}

create(product : IProductCreate) : Observable<IProduct>{
  return this.http.post<IProduct>(
    `${this.apiUrl}/add`,product
  )
}

update(id:number,product:IProductUpdate) :Observable<IProduct>{
  return this.http.put<IProduct>(
    `${this.apiUrl}/${id}`,product
  )
}

delete(id:number) : Observable<IProduct>{
  return this.http.delete<IProduct>(
    `${this.apiUrl}/${id}`
  )
}}

