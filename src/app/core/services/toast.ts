import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  private _message = signal<string | null>(null);
  readonly message = this._message.asReadonly();

  show(text: string) {
    this._message.set(text);
    setTimeout(() => this._message.set(null), 3000);
  }
}