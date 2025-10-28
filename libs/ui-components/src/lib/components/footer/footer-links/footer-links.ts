import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FooterLinkGroup } from '../../../models/footer';

@Component({
  selector: 'lib-footer-links',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer-links.html',
  styleUrl: './footer-links.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterLinks {
  @Input({ required: true }) linkGroups: ReadonlyArray<FooterLinkGroup> = [];
}
