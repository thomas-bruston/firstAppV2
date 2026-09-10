
import { Component,Input } from '@angular/core';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { ChangeDetectionStrategy } from '@angular/core';

const buttonVariants = cva (
  'inline-flex items-center rounded-lg justify-center font-medium focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants : {
      variant : {
        primary : 'bg-primary-600 text-white font-semibold hover:bg-primary-700',
        secondary : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger : 'bg-danger-500 text-white hover:bg-danger-600',
        dark : 'bg-slate-900 text-white font-semibold hover:bg-slate-800',
        success : 'bg-emerald-600 text-white font-semibold hover:bg-emerald-700',
      },
      size : {
        sm : 'py-1.5 px-3 text-sm',
        md : 'py-2.5 px-5 text-sm',
        lg : 'py-3 px-8 text-base',

      }
    },
    defaultVariants: {
      variant : 'primary',
      size : 'md',
    }}

);


@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() variant : 'primary' | 'secondary' | 'danger' | 'dark' | 'success' = 'primary' ;
  @Input() size : 'sm' | 'md' | 'lg' = 'md' ;
  @Input() disabled : boolean = false ;
  @Input() type : 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth : boolean = false ;

get classes () : string{
  return clsx(
    buttonVariants({variant : this.variant, size : this.size}),
    { 'w-full': this.fullWidth }
  );
}


  }

