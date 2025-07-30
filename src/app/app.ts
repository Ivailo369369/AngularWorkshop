import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorNotification, Footer, Header } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
