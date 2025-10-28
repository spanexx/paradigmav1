import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Differentiator } from '../../../../models/landing';

@Component({
  selector: 'app-differentiator-card',
  standalone: true,
  imports: [],
  templateUrl: './differentiator-card.html',
  styleUrl: './differentiator-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentiatorCard {
  @Input({ required: true }) differentiator!: Differentiator;
}
