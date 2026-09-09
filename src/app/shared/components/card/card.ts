import { Component,Input } from '@angular/core';
import { cva } from 'class-variance-authority';
import { ChangeDetectionStrategy } from '@angular/core';

const cardVariants = cva(
  'bg-white rounded-xl border border-gray-200 relative',
  {
    variants : {
        padding : {
          none : '',
          sm : 'p-2',
          md : 'p-4',
          lg : 'p-6',
        },

        shadow : {
          none : '',
          sm : 'shadow-sm',
          md : 'shadow-md',
        }

      },
      defaultVariants: {
          padding: 'md',
          shadow: 'sm'
        }
    }
  );
  


@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() padding : 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() shadow : 'none' | 'sm' | 'md'  = 'sm'

  get classes () : string{
    return cardVariants ({ padding : this.padding , shadow : this.shadow})
  }
}
