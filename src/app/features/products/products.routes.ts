import { Routes } from "@angular/router";

export const PRODUCTS_ROUTES : Routes =[

    { path : '',
        loadComponent : () =>
            import('./product-list/product-list')
        .then( m => m.ProductList)
    },
       { path : 'new' ,
        loadComponent : () =>
            import('./product-form/product-form')
        .then( m => m.ProductForm)
    },

    { path : ':id',
        loadComponent : () =>
            import('./product-detail/product-detail')
        .then( m => m.ProductDetail)
    },


    { path : ':id/edit',
        loadComponent:() =>
            import('./product-form/product-form')
        .then( m => m.ProductForm)
    },

]


