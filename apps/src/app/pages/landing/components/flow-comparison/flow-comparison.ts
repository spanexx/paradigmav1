import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-flow-comparison',
  standalone: true,
  imports: [],
  templateUrl: './flow-comparison.html',
  styleUrl: './flow-comparison.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowComparison {}