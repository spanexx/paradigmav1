import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '@paradigma/ui-components';
import { ProblemCard } from '../problem-card/problem-card';
import { Problem } from '../../../../models/landing';

@Component({
  selector: 'app-problems-section',
  standalone: true,
  imports: [NgFor, SectionHeader, ProblemCard, RouterLink],
  templateUrl: './problems-section.html',
  styleUrl: './problems-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemsSection {
  @Input({ required: true }) problems: ReadonlyArray<Problem> = [];
}
