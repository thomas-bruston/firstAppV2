import { Component, OnInit, inject, signal, input, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductStore } from '../../../core/store/product.store';
import { CurrencyPipe } from '@angular/common';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { Category } from '../../../core/services/category';
import { Title } from '@angular/platform-browser'; 
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Card, CurrencyPipe,ReactiveFormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  readonly store = inject(ProductStore);
  private readonly categoryService = inject(Category);
  private readonly titleService = inject(Title);
  private readonly router = inject(Router);
  
  // Maintenant : input() au lieu de @Input() — c'est un signal, pas une propriété simple
  sort = input<string>();
  category = input<string>();
  search = input<string>();

  protected Math = Math;

    // NOUVEAU : FormControl qui capte la saisie utilisateur
  searchControl = new FormControl('');

  // NOUVEAU : effect() peut maintenant suivre search() car c'est un vrai signal
  constructor() {
    effect(() => {
      const query = this.search();   // ← () car c'est un signal maintenant
      const cat = this.category();    // ← () pareil

      if (cat) {
        return; // la catégorie est gérée dans ngOnInit, on ne fait rien ici
      }

      if (query) {
        this.store.searchProducts(query);
      } else {
        this.store.loadProducts();
      }
    });

    // NOUVEAU : pipe RxJS qui remplace setTimeout/clearTimeout
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),           // attend 400ms de silence (comme avant)
        distinctUntilChanged(),       // ignore si la valeur n'a pas changé
        takeUntilDestroyed()          // arrête si le composant est détruit
      )
      .subscribe((query) => {
        this.router.navigate(['/products'], {
          queryParams: { search: query || null, page: 1 },
          queryParamsHandling: 'merge'
        });
      });
  }
  


  ngOnInit(): void {
    this.titleService.setTitle('Produits | FirstAppV2');

     // initialise le FormControl avec la valeur de l'URL au chargement
    this.searchControl.setValue(this.search() ?? '', { emitEvent: false });

    // AVANT : if (this.category)
    // Maintenant : if (this.category())  ← () car c'est un signal
    if (this.category()) {
      this.categoryService.getProductsByCategory(this.category()!).subscribe({
        next: (response) => {
          this.store.setProducts(response.products, response.total);
          // AVANT : if (this.sort)
          // Maintenant : if (this.sort())
          if (this.sort()) {
            this.store.sortProducts(this.sort()!);
          }
        }
      });
    }
  }



  onSort(event: Event): void {
    const sort = (event.target as HTMLSelectElement).value;
    this.store.sortProducts(sort);
    this.router.navigate(['/products'], {
      queryParams: { sort: sort || null },
      queryParamsHandling: 'merge'
    });
  }

  onPrevPage(): void {
    this.store.setPage(this.store.currentPage() - 1);
    this.store.loadProducts();
  }

  onNextPage(): void {
    this.store.setPage(this.store.currentPage() + 1);
    this.store.loadProducts();
  }

  onDelete(id: number): void {
    if (confirm('Supprimer cet article ?')) this.store.deleteProduct(id);
  }

  onReset(): void {
    this.router.navigate(['/products']);
  }
}