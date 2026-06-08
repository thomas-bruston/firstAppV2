import { Component,OnInit,inject,signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../core/services/category';
import { ICategory } from '../../../core/models/category.model';
import { Card } from '../../../shared/components/card/card';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink,Card],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit{
  private readonly categoryService = inject(Category);
   categories = signal<ICategory[]>([]);
   categoryLoading = signal(false);
   categoryError = signal<string|null>(null);


ngOnInit(): void {
  this.loadCategories();
}

loadCategories(): void {
  this.categoryLoading.set(true);
  this.categoryService.getAll().subscribe({
    next: (response) => {
      this.categories.set(response);
      this.categoryLoading.set(false);
    },
   error: () => this.categoryLoading.set(false)

  });
}}
