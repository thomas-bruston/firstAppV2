import { Component,inject } from '@angular/core';
import { Button } from "../../shared/components/button/button";
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);

goToProducts() {
  this.router.navigate(['./products'])
}

}
