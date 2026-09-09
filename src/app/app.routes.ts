import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
   loadComponent:() =>
    import('./features/home/home')
   .then(m=>m.Home)
  },
 

  {
    path : 'products',
    loadChildren:() =>
      import('./features/products/products.routes')
    .then(m => m.PRODUCTS_ROUTES)
  },

  {
  path:'categories',
  loadChildren:() =>
    import('./features/categories/categories.routes')
  .then( m => m.CATEGORIES_ROUTES)
},
   
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found')
        .then(m => m.NotFound)
  }
];
