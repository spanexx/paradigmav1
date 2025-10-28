import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Problem } from '../../../../models/landing';

@Component({
  selector: 'app-problem-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './problem-card.html',
  styleUrl: './problem-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemCard {
  @Input({ required: true }) problem!: Problem;

  getIconForTitle(title: string): string {
    const iconMap: Record<string, string> = {
      'High entry tickets': 'payments',
      'Hard to trust strangers': 'shield',
      'Slow exits': 'bolt'
    };
    
    return iconMap[title] || 'help';
  }
  
  getCardClass(title: string): string {
    const classMap: Record<string, string> = {
      'High entry tickets': 'problem-card--high-entry',
      'Hard to trust strangers': 'problem-card--trust',
      'Slow exits': 'problem-card--slow-exits'
    };
    
    return classMap[title] || '';
  }
}
