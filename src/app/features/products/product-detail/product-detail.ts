import { Component,OnInit,inject,Input,signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductStore } from '../../../core/store/product.store';
import { IProductComment } from '../../../core/models/comment.model';
import { Comment } from '../../../core/services/comment';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { Title } from '@angular/platform-browser';
import { effect } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink,CurrencyPipe,Button,Card,],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit{
  readonly store = inject(ProductStore);
  private readonly commentService = inject(Comment);
  private readonly titleService = inject(Title);
  @Input() id!: string;
  comments = signal<IProductComment[]>([]);
  commentsLoading = signal(false);

  constructor() {
    effect(() => {
      const p = this.store.selectedProduct();
      if (p) {
        this.titleService.setTitle(`${p.title} | FirstApp`);
      }
    });
  }

 ngOnInit(): void {
   this.store.loadById(Number(this.id))
   this.loadComments();
 };

 loadComments() : void {
  this.commentsLoading.set (true);
  this.commentService.getByProductId(Number(this.id)).subscribe({
    next:(Response) => {
      this.comments.set(Response.comments);
      this.commentsLoading.set(false)
    },
    error:() =>  this.commentsLoading.set(false)
  })
 }





}
