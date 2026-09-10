import { Component, inject } from '@angular/core';
import { Toast } from '../../../core/services/toast';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toast-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './toast-display.html',
  styleUrl: './toast-display.css',
})
export class ToastDisplay {
  toastService = inject(Toast);
}
