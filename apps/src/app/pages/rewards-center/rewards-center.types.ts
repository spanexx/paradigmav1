export interface RewardTier {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly highlight?: boolean;
}

export interface ProgressBreakdown {
  readonly label: string;
  readonly icon: string;
  readonly points: number;
}

export interface ActivityItem {
  readonly icon: string;
  readonly summary: string;
  readonly timestamp: string;
}

export interface Mission {
  readonly title: string;
  readonly description: string;
  readonly points: number;
  readonly action: string;
  readonly cta: string;
  readonly disabled?: boolean;
}

export interface RewardCatalogItem {
  readonly title: string;
  readonly description: string;
  readonly cost: string;
  readonly disabled?: boolean;
  readonly image?: string;
  readonly icon?: string;
}

export interface ReferralStats {
  readonly link: string;
  readonly referrals: number;
  readonly points: number;
}
