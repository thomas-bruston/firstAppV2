import { Routes } from "@angular/router";

export const CATEGORIES_ROUTES : Routes = [

    { path : '',
        loadComponent:() =>
            import('./category-list/category-list')
        .then(m => m.CategoryList)
    }
]