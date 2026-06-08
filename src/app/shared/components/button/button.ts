
import { Component,Input } from '@angular/core';
import { cva } from 'class-variance-authority';

const buttonVariants = cva (
  'inline-flex items-center rounded-lg justify-center font-medium focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants : {
      variant : {
        primary : 'bg-primary-600 text-white font-semibold hover:bg-primary-700',
        secondary : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger : 'bg-danger-500 text-white hover:bg-danger-600',
      },
      size : {
        sm : 'py-2 px-1 text-sm',
        md : 'py-4 px-2 text-sm',
        lg : 'py-6 px-3 text-base',

      }
    },
    defaultVariants: {
      variant : 'primary',
      size : 'md',
    }}
  
);


@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() variant : 'primary' | 'secondary' | 'danger' = 'primary' ;
  @Input() size : 'sm' | 'md' | 'lg' = 'md' ;
  @Input() disabled : boolean = false ;
  @Input() type : 'button' | 'submit' | 'reset' = 'button';

get classes () : string{
  return buttonVariants({variant : this.variant, size : this.size})
}


  }

