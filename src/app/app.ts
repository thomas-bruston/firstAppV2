import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';
import { ToastDisplay } from "./shared/components/toast-display/toast-display";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, ToastDisplay],
  templateUrl: './app.html'
})
export class App {}