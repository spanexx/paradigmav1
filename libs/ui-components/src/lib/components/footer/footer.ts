import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FooterLinks } from './footer-links/footer-links';
import { FooterSocial } from './footer-social/footer-social';
import { FooterLegal } from './footer-legal/footer-legal';
import { FooterNewsletter } from './footer-newsletter/footer-newsletter';
import { FooterData } from '../../models/footer';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [FooterLinks, FooterSocial, FooterLegal, FooterNewsletter],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  @Input({ required: true }) footerData!: FooterData;
  @Output() newsletterSubscribe = new EventEmitter<string>();

  protected onNewsletterSubscribe(email: string): void {
    this.newsletterSubscribe.emit(email);
  }
}
