import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NbBadgeModule, NbIconModule } from '@nebular/theme';

export interface HeroCtaStat {
  value: string;
  label: string;
  badge?: string;
}

interface HeroCtaAnimatedStat extends HeroCtaStat {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  display: string;
  hasNumericValue: boolean;
}

const STAT_ANIMATION_DURATION = 3200;

const parseStatValue = (
  value: string,
): Pick<HeroCtaAnimatedStat, 'prefix' | 'suffix' | 'target' | 'decimals' | 'hasNumericValue'> => {
  const numericMatch = value.match(/[-+]?[0-9]*\.?[0-9]+/);
  if (!numericMatch || numericMatch.index === undefined) {
    return { prefix: '', suffix: '', target: 0, decimals: 0, hasNumericValue: false };
  }

  const numberPortion = numericMatch[0];
  const prefix = value.slice(0, numericMatch.index);
  const suffix = value.slice(numericMatch.index + numberPortion.length);
  const decimals = numberPortion.includes('.') ? numberPortion.split('.')[1]?.length ?? 0 : 0;
  const target = parseFloat(numberPortion);

  return { prefix, suffix, target, decimals, hasNumericValue: true };
};

const formatValue = (value: number, decimals: number): string =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

@Component({
  selector: 'lib-hero-cta',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, MatButtonModule, NbIconModule, NbBadgeModule],
  templateUrl: './hero-cta.html',
  styleUrl: './hero-cta.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCta implements OnChanges, AfterViewInit, OnDestroy {
  @Input() eyebrow?: string;
  @Input() title = '';
  @Input() message?: string;
  @Input() primaryLabel?: string;
  @Input() primaryIcon = 'arrow_forward';
  @Input() secondaryLabel?: string;
  @Input() secondaryIcon = 'play_circle';
  @Input() stats: ReadonlyArray<HeroCtaStat> = [];
  @Input() quickTags: ReadonlyArray<string> = [];

  @Output() primaryClick = new EventEmitter<void>();
  @Output() secondaryClick = new EventEmitter<void>();

  protected animatedStats: HeroCtaAnimatedStat[] = [];

  private animationFrameId?: number;
  private animationStart = 0;
  private viewInitialized = false;

  constructor(private readonly cdr: ChangeDetectorRef) {
    console.debug('[HeroCta] component constructed');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('stats' in changes) {
      this.prepareAnimatedStats();
      if (this.viewInitialized) {
        this.startAnimation();
      }
    }
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.startAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  onPrimaryClick(): void {
    this.primaryClick.emit();
  }

  onSecondaryClick(): void {
    this.secondaryClick.emit();
  }

  private prepareAnimatedStats(): void {
    console.debug('[HeroCta] preparing animated stats', this.stats);
    this.animatedStats = (this.stats ?? []).map((stat) => {
      const parsed = parseStatValue(stat.value);
      return {
        ...stat,
        ...parsed,
        display: parsed.hasNumericValue ? `${parsed.prefix}0${parsed.suffix}` : stat.value,
      };
    });
  }

  private startAnimation(): void {
    if (!this.animatedStats.length) {
      return;
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationStart = performance.now();
    console.debug('[HeroCta] starting stat animation');
    this.animationFrameId = requestAnimationFrame(this.runAnimationFrame);
  }

  private runAnimationFrame = (timestamp: number): void => {
    const elapsed = timestamp - this.animationStart;
    const progress = Math.min(elapsed / STAT_ANIMATION_DURATION, 1);
    const eased = easeOutCubic(progress);

    this.animatedStats.forEach((stat) => {
      if (!stat.hasNumericValue) {
        return;
      }

      const currentValue = stat.target * eased;
      const formatted = formatValue(currentValue, stat.decimals);
      stat.display = `${stat.prefix}${formatted}${stat.suffix}`;

      if (progress === 1) {
        stat.display = `${stat.prefix}${formatValue(stat.target, stat.decimals)}${stat.suffix}`;
      }
    });

    this.cdr.markForCheck();

    if (progress < 1) {
      this.animationFrameId = requestAnimationFrame(this.runAnimationFrame);
    }
  };
}
