import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FooterData } from '../../../models/footer';

@Component({
  selector: 'lib-footer-legal',
  standalone: true,
  imports: [],
  templateUrl: './footer-legal.html',
  styleUrl: './footer-legal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterLegal {
  @Input({ required: true }) footerData!: FooterData;
}
