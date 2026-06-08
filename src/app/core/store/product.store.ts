import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { IProduct, IProductCreate, IProductUpdate } from '../models/product.model';
import { Product } from '../services/product';

interface ProductState {
  products: IProduct[];
  selectedProduct: IProduct | null;
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  limit: number;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  limit: 10
};

export const ProductStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((store) => ({
    totalPages: computed(() => Math.ceil(store.total() / store.limit())),
    skip: computed(() => (store.currentPage() - 1) * store.limit()),
    hasProducts: computed(() => store.products().length > 0),
  })),

  withMethods((store, productService = inject(Product)) => ({

    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          productService.getAll(store.limit(), store.skip()).pipe(
            tap({
              next: (response) => patchState(store, {
                products: response.products,
                total: response.total,
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    loadById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          productService.getById(id).pipe(
            tap({
              next: (product) => patchState(store, {
                selectedProduct: product,
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    createProduct: rxMethod<IProductCreate>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((product) =>
          productService.create(product).pipe(
            tap({
              next: (newProduct) => patchState(store, {
                products: [...store.products(), newProduct],
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    updateProduct: rxMethod<IProductUpdate>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((product) =>
          productService.update(product.id, product).pipe(
            tap({
              next: (updatedProduct) => patchState(store, {
                products: store.products().map(p =>
                  p.id === updatedProduct.id ? updatedProduct : p
                ),
                selectedProduct: updatedProduct,
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    deleteProduct: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          productService.delete(id).pipe(
            tap({
              next: () => patchState(store, {
                products: store.products().filter(p => p.id !== id),
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    searchProducts: rxMethod<string>(
  pipe(
    tap(() => patchState(store, { loading: true, error: null })),
    switchMap((query) =>
      productService.search(query).pipe(
        tap({
          next: (response) => patchState(store, {
            products: response.products,
            total:    response.total,
            loading:  false
          }),
          error: (error) => patchState(store, {
            error:   error.message,
            loading: false
          })
        })
      )
    )
  )
),

    setProducts(products: IProduct[], total: number): void {
    patchState(store, { products, total, loading: false });
  },

    setPage(page: number): void {
      patchState(store, { currentPage: page });
    },
    
    sortProducts(sort: string): void {
  const sorted = [...store.products()];
  
  if (sort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
  }
  
  patchState(store, { products: sorted });
},
  }))
);