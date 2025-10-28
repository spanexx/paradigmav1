import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import {
  AllocationSlice,
  HoldingRow,
  PortfolioStat,
  TimeRange,
  WatchlistItem,
} from './portfolio-overview.types';

@Component({
  selector: 'app-portfolio-overview',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './portfolio-overview.html',
  styleUrl: './portfolio-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioOverview {
  protected readonly ranges: ReadonlyArray<TimeRange> = ['1M', '6M', 'YTD', '1Y', 'All'];
  protected readonly activeRange = signal<TimeRange>('1M');

  protected readonly stats: ReadonlyArray<PortfolioStat> = [
    { label: 'Total portfolio value', value: '€1,250,430', delta: '+2.5%', trend: 'up' },
    { label: 'Net IRR', value: '12.8%', delta: '+0.8%', trend: 'up' },
    { label: 'Net cash flow', value: '€85,200', delta: '+5.1%', trend: 'up' },
    { label: 'Distributions', value: '€22,150', delta: '-1.2%', trend: 'down' },
  ];

  protected readonly holdings: ReadonlyArray<HoldingRow> = [
    {
      name: 'The Grand Lofts',
      assetClass: 'Commercial real estate',
      currentValue: '€450,120',
      costBasis: '€400,000',
      pnl: '+€50,120',
      pnlTrend: 'up',
    },
    {
      name: 'Monet Heritage Fraction',
      assetClass: 'Fine art',
      currentValue: '€125,800',
      costBasis: '€110,000',
      pnl: '+€15,800',
      pnlTrend: 'up',
    },
    {
      name: 'Innovatech Seed Fund',
      assetClass: 'Venture capital',
      currentValue: '€75,000',
      costBasis: '€100,000',
      pnl: '-€25,000',
      pnlTrend: 'down',
    },
    {
      name: 'Atlas Logistics SPV',
      assetClass: 'Infrastructure debt',
      currentValue: '€255,310',
      costBasis: '€250,000',
      pnl: '+€5,310',
      pnlTrend: 'up',
    },
  ];

  protected readonly allocation: ReadonlyArray<AllocationSlice> = [
    { label: 'Commercial real estate', weight: 42, color: '#38bdf8' },
    { label: 'Fine art', weight: 16, color: '#a855f7' },
    { label: 'Venture capital', weight: 12, color: '#f97316' },
    { label: 'Infrastructure', weight: 20, color: '#10b981' },
    { label: 'Liquidity', weight: 10, color: '#6366f1' },
  ];

  protected readonly watchlist: ReadonlyArray<WatchlistItem> = [
    { name: 'Miami Waterfront Villa', category: 'Real estate', value: '€2.1M', change: '+1.2%', trend: 'up' },
    { name: 'Warhol Edition Series', category: 'Fine art', value: '€860K', change: '-0.5%', trend: 'down' },
    { name: 'Helios Agritech Fields', category: 'Agri-tech', value: '€640K', change: '+0.9%', trend: 'up' },
  ];

  protected readonly performanceHeadline = computed(
    () => `Range ${this.activeRange()} · Signals audited hourly`,
  );

  constructor() {
    console.debug('[PortfolioOverview] component ready', { range: this.activeRange() });
  }

  protected setRange(range: TimeRange): void {
    this.activeRange.set(range);
    console.debug('[PortfolioOverview] range changed', { range });
  }
}
