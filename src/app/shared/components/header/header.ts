import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../../core/store/auth.store';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly store = inject(AuthStore);
  private readonly router = inject(Router);

  logout(): void {
    this.store.logout();
  }

  onSearch(event: Event, input: HTMLInputElement): void {
    event.preventDefault();
    const query = input.value.trim();
    this.router.navigate(['/products'], { queryParams: { search: query || null } });
  }
}
