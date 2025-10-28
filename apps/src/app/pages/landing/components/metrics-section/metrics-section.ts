import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SectionHeader, Sparkline } from '@paradigma/ui-components';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Metric } from '../../../../models/landing';

@Component({
  selector: 'app-metrics-section',
  standalone: true,
  imports: [NgFor, SectionHeader, Sparkline, RouterLink],
  templateUrl: './metrics-section.html',
  styleUrl: './metrics-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsSection {
  @Input({ required: true }) metrics: ReadonlyArray<Metric> = [];
}
