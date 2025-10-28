import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-step-list',
  imports: [],
  templateUrl: './step-list.html',
  styleUrl: './step-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepList {}
