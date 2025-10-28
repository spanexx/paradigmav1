import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppNav } from '../app-nav/app-nav';
import { AppNavItem } from '../../models/navigation';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AppNav],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  @Input({ required: true }) navItems: ReadonlyArray<AppNavItem> = [];
  @Output() navSelected = new EventEmitter<string>();

  protected onNavSelect(href: string): void {
    this.navSelected.emit(href);
  }
}
