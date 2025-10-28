import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterData } from '../../../models/footer';

@Component({
  selector: 'lib-footer-newsletter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer-newsletter.html',
  styleUrl: './footer-newsletter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterNewsletter {
  @Input({ required: true }) footerData!: FooterData;
  @Output() subscribe = new EventEmitter<string>();

  protected email = '';

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (this.email.trim()) {
      this.subscribe.emit(this.email.trim());
      this.email = '';
    }
  }
}
