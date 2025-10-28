import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Flow } from '../../../../models/landing';

@Component({
  selector: 'app-flow-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './flow-card.html',
  styleUrl: './flow-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowCard {
  @Input({ required: true }) flow!: Flow;
}
