import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../../core/store/auth.store';
import { Button } from '../button/button';


@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink,RouterLinkActive,Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly store = inject(AuthStore);

  logout(): void{
    this.store.logout()
  }
}
