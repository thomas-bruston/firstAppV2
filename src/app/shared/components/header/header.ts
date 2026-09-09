import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
