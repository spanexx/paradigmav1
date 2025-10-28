import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { NbIconModule } from '@nebular/theme';

@Component({
  selector: 'lib-section-header',
  standalone: true,
  imports: [NgClass, NgIf, NbIconModule],
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeader {
  @Input() eyebrow?: string;
  @Input() title = '';
  @Input() description?: string;
  @Input() align: 'start' | 'center' | 'end' = 'center';
  @Input() matIcon?: string;
  @Input() nbIcon?: string;
}
