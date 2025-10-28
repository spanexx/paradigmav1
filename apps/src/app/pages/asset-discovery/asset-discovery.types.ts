export type TicketBand = 'Low' | 'Mid' | 'High';

export type SortKey = 'irr-desc' | 'newest' | 'min-ticket';

export type SustainabilityTag = 'ESG Compliant' | 'Green Energy' | 'Impact Ready';

export type RiskBand = 'Low' | 'Medium' | 'High';

export interface AssetCard {
  readonly title: string;
  readonly manager: string;
  readonly location: string;
  readonly minimum: string;
  readonly irr: string;
  readonly term: string;
  readonly fundingProgress: number;
  readonly statusBadge?: 'NEW' | 'HOT';
  readonly image: string;
  readonly sustainability: ReadonlyArray<SustainabilityTag>;
}

export interface FilterGroup<TValue extends string> {
  readonly title: string;
  readonly options: ReadonlyArray<TValue>;
}
