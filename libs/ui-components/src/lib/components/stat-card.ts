import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NbIconModule } from '@nebular/theme';

@Component({
  selector: 'lib-stat-card',
  standalone: true,
  imports: [NgClass, NgIf, MatCardModule, MatIconModule, NbIconModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard {
  @Input() label = '';
  @Input() value = '';
  @Input() delta?: string;
  @Input() deltaIcon: 'north_east' | 'south_east' | 'horizontal_rule' = 'north_east';
  @Input() variant: 'positive' | 'negative' | 'neutral' = 'neutral';
  @Input() meta?: string;
}
