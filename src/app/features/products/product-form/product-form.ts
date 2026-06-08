import { Component,OnInit,DoCheck,inject,Input, input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { ProductStore } from '../../../core/store/product.store';
import { Button} from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { AppInput } from '../../../shared/components/input/input';
import { Category } from '../../../core/services/category';
import { min } from 'rxjs';

@Component({
  selector: 'app-product-form',
  imports: [RouterLink,Button,Card, AppInput,ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit,DoCheck{
  readonly store = inject(ProductStore);
  readonly router = inject(Router);
  @Input() id? : string;
  isEditMode = false;

  //formulaire
  
  form = new FormGroup({
    title : new FormControl ('',[Validators.required,Validators.minLength(3)]),
    description : new FormControl('',[Validators.required , Validators.minLength(10)]),
    price : new FormControl <number|null> (null,[Validators.required,Validators.min(0)]),
    category : new FormControl ('', [Validators.required]),
    thumbnail : new FormControl ('',[Validators.required]),
    stock:  new FormControl <number|null>( null,[Validators.required, Validators.min(0)]),

  })

  ngOnInit(): void {
  if (this.id){
    this.isEditMode = true;
    this.store.loadById(Number (this.id));
  }
}
ngDoCheck(): void {
  if (this.isEditMode && this.store.selectedProduct() && !this.form.dirty){
    const p = this.store.selectedProduct()!;
    this.form.patchValue({
      title : p.title,
      description : p.description,
      price : p.price,
      category : String (p.category),
      thumbnail : p.thumbnail,
      stock : p.stock,
    }); 
  }
}

//methodes erreur

get titleError() : string{
  const ctrl = this.form.get('title');
  if(ctrl?.touched && ctrl?.hasError('required')) return'le titre est requis';
  if (ctrl?.touched &&ctrl?.hasError('minlength')) return'Le titre doit comporter 3 caractères minimum ';
  return''
};

get descriptionError() : string{
  const ctrl = this.form.get('description');
  if(ctrl?.touched && ctrl?.hasError('required')) return'Description requise';
  if (ctrl?.touched && ctrl.hasError('minlength')) return'La decription doit comporter 10 caractères minimum';
  return''
};

get priceError() : string{
    const ctrl = this.form.get('price');
    if(ctrl?.touched && ctrl?.hasError('required')) return'Le prix est requis';
    if (ctrl?.touched && ctrl?.hasError('min')) return 'Le prix minimum est 0';
    return''
};

get categoryError() : string{
  const ctrl = this.form.get('category');
  if (ctrl?.touched && ctrl.hasError('required')) return'Categorie requise';
  return''
};

get thumbnailError() : string{
  const ctrl = this.form.get('thumbnail');
  if(ctrl?.touched &&ctrl?.hasError('required')) return'Image de type thumbnail requise';
  return ''
}

get stockError() : string{
  const ctrl = this.form.get('stock');
  if( ctrl?.touched && ctrl?.hasError('required')) return 'stock requis';
  if (ctrl?.touched && ctrl?.hasError('min')) return 'Le stock minimum est 0';
  return ''
};

// onSubmit

onSubmit() : void {
  if(this.form.invalid){
    this.form.markAllAsTouched();
    return;
  }

//recup valeur
const formValue = this.form.getRawValue();

//Update ou Create???

if(this.isEditMode){
  this.store.updateProduct({
    id : Number(this.id),
    title : formValue.title ?? undefined,
    description : formValue.description ?? undefined,
    price : formValue.price ?? undefined,
    category : formValue.category ?? undefined,
    thumbnail : formValue.thumbnail ?? undefined,
    stock : formValue.stock ?? undefined,

  });
}
else {
  this.store.createProduct({
  title:       formValue.title ?? '',
  description: formValue.description ?? '',
  price:       formValue.price ?? 0,
  category:    formValue.category ?? '',
  thumbnail:   formValue.thumbnail ?? '',
  stock:       formValue.stock ?? 0,
  rating:      0,
});
}
this.router.navigate(['/products']);
}
}
