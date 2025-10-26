import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, TitleCasePipe],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'admin';

  constructor() {
    console.log('[AppShell] initialized for admin workspace');
  }
}
