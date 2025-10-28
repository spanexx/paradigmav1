export interface BalanceSnapshot {
  readonly label: string;
  readonly amount: string;
}

export interface TransactionRow {
  readonly date: string;
  readonly type: string;
  readonly asset: string;
  readonly amount: string;
  readonly status: 'completed' | 'pending';
}

export interface ScheduledPlan {
  readonly label: string;
  readonly detail: string;
  readonly amount: string;
}

export interface BannerNotice {
  readonly title: string;
  readonly body: string;
  readonly action: string;
}
