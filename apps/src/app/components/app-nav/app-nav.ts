import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppNavItem } from '../../models/navigation';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgClass, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './app-nav.html',
  styleUrl: './app-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNav {
  @Input({ required: true }) navItems: ReadonlyArray<AppNavItem> = [];
  @Output() navSelected = new EventEmitter<string>();

  protected onSelect(href: string): void {
    this.navSelected.emit(href);
  }
}
