import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SectionHeader } from '@paradigma/ui-components';
import { ProcessFlow } from '../process-flow/process-flow';
import { Flow } from '../../../../models/landing';

@Component({
  selector: 'app-process-flow-section',
  standalone: true,
  imports: [SectionHeader, ProcessFlow],
  templateUrl: './process-flow-section.html',
  styleUrl: './process-flow-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessFlowSection {
  @Input({ required: true }) flows: ReadonlyArray<Flow> = [];
  @Input() loading = false;
}