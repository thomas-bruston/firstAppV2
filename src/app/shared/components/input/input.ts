import { Component,Input,forwardRef,} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { cva } from 'class-variance-authority';

const inputVariants = cva (
  'w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2',
  {
    variants : {
      state : {
        default : 'border-gray-300 focus:border-primary-500 focus:ring-primary-100',
        error : 'border-danger-500 focus:border-danger-500 focus:ring-red-100',
        disabled : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed',
      }
    },
    defaultVariants : {
      state : 'default'
    }
  }

);


@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers : [
      {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInput),
      multi: true
    }
  ]
})

export class AppInput implements ControlValueAccessor{
  @Input() label = '';
  @Input() placeholder = '';
  @Input() errorMessage = '';
  @Input() disabled = false;

  value = '';
  onChange = (_: string) => {}; 
  onTouched = () => {};


  get state(): 'default' | 'error' | 'disabled' {
    if (this.disabled) return 'disabled';
    if (this.errorMessage) return 'error';
    return 'default';
  }

  get classes(): string {
    return inputVariants({ state: this.state });
  }
writeValue(value: string): void {
  this.value = value?? '';
}

registerOnChange(fn: (_: string) => void): void {
  this.onChange = fn;
}

registerOnTouched(fn: () => void): void {
  this.onTouched = fn;
}

setDisabledState(isDisabled: boolean): void {
  this.disabled = isDisabled;
}

onInput(event : Event) : void{
  const value = (event.target as HTMLInputElement).value;
  this.value = value;
  this.onChange(value);
}

  
}


