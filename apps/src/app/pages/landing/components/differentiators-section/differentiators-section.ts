import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '@paradigma/ui-components';
import { DifferentiatorCard } from '../differentiator-card/differentiator-card';
import { Differentiator } from '../../../../models/landing';

@Component({
  selector: 'app-differentiators-section',
  standalone: true,
  imports: [NgFor, SectionHeader, DifferentiatorCard, RouterLink],
  templateUrl: './differentiators-section.html',
  styleUrl: './differentiators-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentiatorsSection {
  @Input({ required: true }) differentiators: ReadonlyArray<Differentiator> = [];
}
