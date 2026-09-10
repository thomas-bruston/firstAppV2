import { Component, OnInit, inject, signal, Type, ChangeDetectionStrategy } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category } from '../../../core/services/category';
import { ICategory } from '../../../core/models/category.model';
import { Card } from '../../../shared/components/card/card';
import {
  LucideSparkles,
  LucideSprayCan,
  LucideSofa,
  LucideShoppingBasket,
  LucideLamp,
  LucideUtensilsCrossed,
  LucideLaptop,
  LucideShirt,
  LucideFootprints,
  LucideWatch,
  LucideSmartphone,
  LucideBike,
  LucideDroplet,
  LucideDumbbell,
  LucideGlasses,
  LucideTablet,
  LucideCar,
  LucideHandbag,
  LucideGem,
  LucidePackage,
} from '@lucide/angular';

const CATEGORY_ICONS: Record<string, Type<unknown>> = {
  beauty: LucideSparkles,
  fragrances: LucideSprayCan,
  furniture: LucideSofa,
  groceries: LucideShoppingBasket,
  'home-decoration': LucideLamp,
  'kitchen-accessories': LucideUtensilsCrossed,
  laptops: LucideLaptop,
  'mens-shirts': LucideShirt,
  'mens-shoes': LucideFootprints,
  'mens-watches': LucideWatch,
  'mobile-accessories': LucideSmartphone,
  motorcycle: LucideBike,
  'skin-care': LucideDroplet,
  smartphones: LucideSmartphone,
  'sports-accessories': LucideDumbbell,
  sunglasses: LucideGlasses,
  tablets: LucideTablet,
  tops: LucideShirt,
  vehicle: LucideCar,
  'womens-bags': LucideHandbag,
  'womens-dresses': LucideShirt,
  'womens-jewellery': LucideGem,
  'womens-shoes': LucideFootprints,
  'womens-watches': LucideWatch,
};

@Component({
  selector: 'app-category-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Card, NgComponentOutlet],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  private readonly categoryService = inject(Category);
  categories = signal<ICategory[]>([]);
  categoryLoading = signal(false);
  categoryError = signal<string | null>(null);

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
  }

  iconFor(slug: string): Type<unknown> {
    return CATEGORY_ICONS[slug] ?? LucidePackage;
  }
}
