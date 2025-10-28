import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FAQ } from '../../../../models/landing';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [],
  templateUrl: './faq-item.html',
  styleUrl: './faq-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqItem {
  @Input({ required: true }) faq!: FAQ;
}
