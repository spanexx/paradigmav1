import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TourComment, TourHotspot, TourScene } from './tour-experience.types';

@Component({
  selector: 'app-tour-experience',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './tour-experience.html',
  styleUrl: './tour-experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourExperience {
  protected readonly asset = {
    name: 'The Grand Hyatt Residence',
    address: '123 Market Street, San Francisco, CA 94103',
    availability: 'Available',
    heroImage:
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
  } as const;

  protected readonly scenes: ReadonlyArray<TourScene> = [
    { label: 'Living room', icon: 'weekend' },
    { label: 'Kitchen', icon: 'soup_kitchen' },
    { label: 'Primary suite', icon: 'king_bed' },
    { label: 'Rooftop deck', icon: 'wb_twighlight' },
    { label: 'Workspace', icon: 'desk' },
  ];

  protected readonly hotspots: ReadonlyArray<TourHotspot> = [
    {
      id: 'kitchen-island',
      title: 'Open kitchen island',
      description:
        'Italian marble countertop with integrated storage, Wolf induction range, and Grohe fixtures.',
      image:
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=900&q=80',
      links: [
        { label: 'View appliance specs', href: '#' },
        { label: 'Warranty documents', href: '#' },
      ],
    },
    {
      id: 'smart-home',
      title: 'Smart home controls',
      description:
        'Whole-home automation with climate, lighting, and security tied to Paradigma dashboards.',
      image:
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
      links: [{ label: 'Download integration sheet', href: '#' }],
    },
    {
      id: 'rooftop',
      title: 'Rooftop lounge',
      description:
        '4,200 sq ft deck with glass wind barriers, heated seating, and Bay Bridge views.',
      image:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
      links: [{ label: 'Schedule sunset walkthrough', href: '#' }],
    },
  ];

  protected readonly comments: ReadonlyArray<TourComment> = [
    {
      author: 'Alicia Keys',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80',
      timestamp: '2m ago',
      message: "What brand is the oven? @AssetManager please drop the spec sheet.",
    },
    {
      author: 'John Legend',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
      timestamp: '1h ago',
      message: 'Balcony outlook is incredible—see attached capture.',
      attachment:
        'https://images.unsplash.com/photo-1459535653751-d571815e906b?auto=format&fit=crop&w=600&q=80',
    },
  ];

  protected readonly activeScene = signal(0);
  protected readonly activeHotspot = signal(this.hotspots[0]);

  protected readonly timeline = computed(() =>
    this.scenes.map((scene, index) => ({
      ...scene,
      active: index === this.activeScene(),
    })),
  );

  constructor() {
    console.debug('[TourExperience] component ready', {
      scenes: this.scenes.length,
      hotspots: this.hotspots.length,
    });
  }

  protected selectScene(index: number): void {
    this.activeScene.set(index);
    const nextHotspot = this.hotspots[index % this.hotspots.length];
    this.activeHotspot.set(nextHotspot);
    console.debug('[TourExperience] scene selected', { index, nextHotspot: nextHotspot.id });
  }

  protected selectHotspot(hotspot: TourHotspot): void {
    this.activeHotspot.set(hotspot);
    console.debug('[TourExperience] hotspot selected', { id: hotspot.id });
  }
}
