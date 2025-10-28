import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { NgIf } from '@angular/common';

const DEFAULT_HEIGHT = 48;
const DEFAULT_WIDTH = 120;
let sparklineIdCounter = 0;

@Component({
  selector: 'lib-sparkline',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sparkline.html',
  styleUrl: './sparkline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sparkline {
  @Input({ required: true }) label = '';
  @Input({ required: true }) value = '';
  @Input() trend: 'up' | 'down' | 'steady' = 'steady';
  @Input() showMeta = true;

  private readonly _data = signal<ReadonlyArray<number>>([]);
  protected readonly gradientId = `sparkline-gradient-${++sparklineIdCounter}`;
  private readonly trendCopy: Record<'up' | 'down' | 'steady', { icon: string; label: string; stroke: string }> = {
    up: { icon: 'trending_up', label: 'Uptrend', stroke: '' },
    steady: { icon: 'trending_flat', label: 'Steady', stroke: '#38bdf8' },
    down: { icon: 'trending_down', label: 'Downtrend', stroke: '#f97316' },
  };

  @Input({ required: true })
  set data(points: ReadonlyArray<number>) {
    this._data.set(points ?? []);
  }

  protected readonly viewBox = `0 0 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}`;

  protected readonly path = computed(() => {
    const series = this._data();
    if (!series.length) {
      return 'M0,0';
    }

    const max = Math.max(...series);
    const min = Math.min(...series);
    const spread = max - min || 1;
    const stepX = DEFAULT_WIDTH / Math.max(series.length - 1, 1);

    return series
      .map((point, index) => {
        const x = index * stepX;
        const normalized = (point - min) / spread;
        const y = DEFAULT_HEIGHT - normalized * (DEFAULT_HEIGHT - 6) - 3;
        return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  // New computed property for the area path
  protected readonly areaPath = computed(() => {
    const series = this._data();
    if (!series.length) {
      return 'M0,0';
    }

    const max = Math.max(...series);
    const min = Math.min(...series);
    const spread = max - min || 1;
    const stepX = DEFAULT_WIDTH / Math.max(series.length - 1, 1);

    // Start from the left bottom corner
    let pathData = `M0,${DEFAULT_HEIGHT} `;

    // Add the line path
    pathData += series
      .map((point, index) => {
        const x = index * stepX;
        const normalized = (point - min) / spread;
        const y = DEFAULT_HEIGHT - normalized * (DEFAULT_HEIGHT - 6) - 3;
        return `${index === 0 ? 'L' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    // Close the path by going to the right bottom corner and back to start
    pathData += ` L${DEFAULT_WIDTH},${DEFAULT_HEIGHT} Z`;

    return pathData;
  });

  // New computed property for the end point
  protected readonly endPoint = computed(() => {
    const series = this._data();
    if (!series.length) {
      return { x: 0, y: 0 };
    }

    const max = Math.max(...series);
    const min = Math.min(...series);
    const spread = max - min || 1;
    const stepX = DEFAULT_WIDTH / Math.max(series.length - 1, 1);

    const lastIndex = series.length - 1;
    const x = lastIndex * stepX;
    const normalized = (series[lastIndex] - min) / spread;
    const y = DEFAULT_HEIGHT - normalized * (DEFAULT_HEIGHT - 6) - 3;

    return { x, y };
  });

  protected get trendIcon(): string {
    return this.trendCopy[this.trend]?.icon ?? 'trending_flat';
  }

  protected get trendLabel(): string {
    return this.trendCopy[this.trend]?.label ?? 'Trend';
  }

  protected get strokeColor(): string {
    if (this.trend === 'up') {
      return `url(#${this.gradientId})`;
    }
    return this.trendCopy[this.trend]?.stroke ?? '#38bdf8';
  }
}
