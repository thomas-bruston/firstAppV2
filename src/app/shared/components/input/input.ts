import { Component,Input,forwardRef,} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { cva } from 'class-variance-authority';
import { ChangeDetectionStrategy } from '@angular/core';

const inputVariants = cva (
  'w-full transition-colors focus:outline-none focus:ring-2',
  {
    variants : {
      state : {
        default : 'focus:ring-primary-100',
        error : 'ring-2 ring-danger-500 focus:ring-danger-500',
        disabled : 'bg-gray-50 text-gray-400 cursor-not-allowed',
      },
      variant : {
        outlined : 'rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500',
        filled : 'rounded-xl border-0 bg-gray-100 px-4 py-3 text-sm focus:ring-emerald-400',
      }
    },
    defaultVariants : {
      state : 'default',
      variant : 'outlined'
    }
  }

);


@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() type = 'text';
  @Input() variant: 'outlined' | 'filled' = 'outlined';

  value = '';
  onChange = (_: string) => {}; 
  onTouched = () => {};


  get state(): 'default' | 'error' | 'disabled' {
    if (this.disabled) return 'disabled';
    if (this.errorMessage) return 'error';
    return 'default';
  }

  get classes(): string {
    return inputVariants({ state: this.state, variant: this.variant });
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


