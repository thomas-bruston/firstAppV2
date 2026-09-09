import { Component, inject, signal, input, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductStore } from '../../../core/store/product.store';
import { IProductComment } from '../../../core/models/comment.model';
import { Comment } from '../../../core/services/comment';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { Title } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe, Button, Card],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  readonly store = inject(ProductStore);
  private readonly commentService = inject(Comment);
  private readonly titleService = inject(Title);
  router = inject(Router);

  // AVANT : @Input() id!: string;
  // MAINTENANT : input.required() — signal, garanti non-vide
  id = input.required<string>();

  comments = signal<IProductComment[]>([]);
  commentsLoading = signal(false);

  constructor() {
    // effect n°1 — déjà existant, change le titre de la page
    effect(() => {
      const p = this.store.selectedProduct();
      if (p) {
        this.titleService.setTitle(`${p.title} | FirstApp`);
      }
    });

    // effect n°2 — NOUVEAU, remplace ngOnInit()
    // se déclenche automatiquement dès que id() est disponible
    effect(() => {
      const productId = Number(this.id());
      this.store.loadById(productId);
      this.loadComments(productId);
    });
  }

  loadComments(productId: number): void {
    this.commentsLoading.set(true);
    this.commentService.getByProductId(productId).subscribe({
      next: (response) => {
        this.comments.set(response.comments);
        this.commentsLoading.set(false);
      },
      error: () => this.commentsLoading.set(false)
    });
  }
}