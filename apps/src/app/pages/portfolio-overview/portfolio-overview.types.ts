export type TimeRange = '1M' | '6M' | 'YTD' | '1Y' | 'All';

export interface PortfolioStat {
  readonly label: string;
  readonly value: string;
  readonly delta: string;
  readonly trend: 'up' | 'down';
}

export interface HoldingRow {
  readonly name: string;
  readonly assetClass: string;
  readonly currentValue: string;
  readonly costBasis: string;
  readonly pnl: string;
  readonly pnlTrend: 'up' | 'down';
}

export interface AllocationSlice {
  readonly label: string;
  readonly weight: number;
  readonly color: string;
}

export interface WatchlistItem {
  readonly name: string;
  readonly category: string;
  readonly value: string;
  readonly change: string;
  readonly trend: 'up' | 'down';
}
