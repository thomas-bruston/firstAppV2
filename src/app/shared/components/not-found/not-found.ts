import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Button } from "../button/button";
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
