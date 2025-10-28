import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { SocialIconSet } from '../../../icons/social-icon-set';
import { SocialLink } from '../../../models/footer';

@Component({
  selector: 'lib-footer-social',
  standalone: true,
  imports: [NgFor, SocialIconSet],
  templateUrl: './footer-social.html',
  styleUrl: './footer-social.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSocial {
  @Input({ required: true }) socialLinks: ReadonlyArray<SocialLink> = [];
}
