import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductComment } from '../models/comment.model';
import { ICommentsResponse } from '../models/api-response.model';
import { ICommentCreate } from '../models/comment.model';


@Injectable({
  providedIn: 'root',
})
export class Comment {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com';

  getByProductId(productId : number) : Observable<ICommentsResponse>{
    return this.http.get<ICommentsResponse>(
      `${this.apiUrl}/posts/${productId}/comments`
    )
  }
  create(comment: ICommentCreate): Observable<IProductComment> {
return this.http.post<IProductComment>(
`${this.apiUrl}/comments/add`,comment
);
}
}
