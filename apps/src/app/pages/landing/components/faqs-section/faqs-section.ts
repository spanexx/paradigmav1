import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '@paradigma/ui-components';
import { FaqItem } from '../faq-item/faq-item';
import { FAQ } from '../../../../models/landing';

@Component({
  selector: 'app-faqs-section',
  standalone: true,
  imports: [NgFor, SectionHeader, FaqItem, RouterLink],
  templateUrl: './faqs-section.html',
  styleUrl: './faqs-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqsSection {
  @Input({ required: true }) faqs: ReadonlyArray<FAQ> = [];
}
