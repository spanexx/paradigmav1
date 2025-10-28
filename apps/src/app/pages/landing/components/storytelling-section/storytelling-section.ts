import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SectionHeader } from '@paradigma/ui-components';
import { InfographicStory } from '../../landing.content';

@Component({
  selector: 'app-storytelling-section',
  standalone: true,
  imports: [NgFor, NgIf, SectionHeader],
  templateUrl: './storytelling-section.html',
  styleUrl: './storytelling-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorytellingSection {
  @Input({ required: true }) story!: InfographicStory;

  protected readonly activeIndex = signal(0);

  selectStage(index: number): void {
    this.activeIndex.set(index);
    console.debug('[StorytellingSection] stage selected', { index });
  }
}
