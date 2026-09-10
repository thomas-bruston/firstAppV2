
import { Component,inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AuthStore } from '../../core/store/auth.store';
import { Button} from '../../shared/components/button/button';
import { Card } from '../../shared/components/card/card';
import { AppInput } from '../../shared/components/input/input';
import { effect } from '@angular/core';
import { Toast } from '../../core/services/toast';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule,RouterLink,Button,Card,AppInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    readonly store = inject(AuthStore);
    readonly router = inject(Router);
    readonly toast = inject(Toast);

constructor() {
    effect(() => {
      
      if (this.store.isAuthenticated()) {
        this.router.navigate(['/products']);
      } else{
        const err = this.store.error();
        if(err) {
          this.toast.show(err)
        }
      }
    });
  }


    //formulaire
  
  form = new FormGroup({
    username: new FormControl ('',[Validators.required,Validators.minLength(3)]),
    password: new FormControl ('',[Validators.required,Validators.minLength(10)])

  })


  get usernameError(): string {
    const ctrl = this.form.get('username');
    if (ctrl?.touched && ctrl?.hasError('required')) return 'le username est requis';
    if (ctrl?.touched && ctrl?.hasError('minlength')) return 'Le username doit comporter 3 caractères minimum';
    return '';
  }

  get passwordError(): string {
    const ctrl = this.form.get('password');
    if (ctrl?.touched && ctrl?.hasError('required')) return 'Mot de passe requis';
    if (ctrl?.touched && ctrl.hasError('minlength')) return 'Le mot de passe doit comporter 10 caractères minimum';
    return '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const formValue = this.form.getRawValue();
this.store.login({
  username: formValue.username ?? '',
  password: formValue.password ?? ''
});

  }}

