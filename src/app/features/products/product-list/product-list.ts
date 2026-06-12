import { Component,Input,OnInit,inject,signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductStore } from '../../../core/store/product.store';
import { CurrencyPipe } from '@angular/common';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { Category } from '../../../core/services/category';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-product-list',
  imports: [RouterLink,Button,Card,CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
readonly store = inject(ProductStore);
private readonly categoryService = inject(Category);
private readonly titleService = inject(Title);
private readonly router = inject(Router)
private searchTimeout : ReturnType<typeof setTimeout> | null=null;
searchQuery = signal('');
sortQuery = signal('');
@Input() sort? : string;
@Input() category? : string;
protected Math = Math;


ngOnInit(): void {
  this.titleService.setTitle('Produits | FirstAppV2');
  if (this.category) {
    this.categoryService.getProductsByCategory(this.category).subscribe({
      next: (response) => {
        this.store.setProducts(response.products, response.total);
        if (this.sort) {
          this.sortQuery.set(this.sort);
          this.store.sortProducts(this.sort);
        }
      }
    });
  } else {
    this.store.loadProducts();
      if (this.sort) {
        this.sortQuery.set(this.sort);
    }
  }
}

onSearch(event: Event): void {
  const query = (event.target as HTMLInputElement).value;
  this.searchQuery.set(query);

  if (this.searchTimeout) clearTimeout(this.searchTimeout);
  this.searchTimeout = setTimeout(() => {
    if (query.trim()) {
      this.store.searchProducts(query);
    } else {
      this.store.loadProducts();
    }
  }, 400);
}

onPrevPage() :void{
  this.store.setPage(this.store.currentPage()-1);
  this.store.loadProducts();

};
onNextPage() : void{
  this.store.setPage(this.store.currentPage()+1);
  this.store.loadProducts();
};

onDelete(id:number) : void{
  if(confirm('Supprimer cet article ?'))
  this.store.deleteProduct(id);
};

onReset(): void {
  this.searchQuery.set('');
  this.store.loadProducts();
}

onSort(event: Event): void {
  const sort = (event.target as HTMLSelectElement).value;
  this.sortQuery.set(sort);
  this.store.sortProducts(sort);
  this.router.navigate(['/products'], {
    queryParams: { sort: sort || null },
    queryParamsHandling: 'merge'
  });
}

}
