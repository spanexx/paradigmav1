import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '@paradigma/ui-components';
import { Flow } from '../../../../models/landing';

@Component({
  selector: 'app-flows-section',
  standalone: true,
  imports: [NgFor, NgIf, SectionHeader, RouterLink],
  templateUrl: './flows-section.html',
  styleUrl: './flows-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowsSection {
  @Input({ required: true }) flows: ReadonlyArray<Flow> = [];
  @Input() loading = false;

  protected readonly skeletons = Array.from({ length: 3 });
}
