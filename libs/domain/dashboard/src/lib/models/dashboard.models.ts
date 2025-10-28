/**
 * Dashboard Models
 * 
 * This file defines all the TypeScript interfaces and types
 * used throughout the dashboard domain. These models represent
 * the structure of the data displayed on the dashboard.
 */
import { Observable } from 'rxjs';

// Type definitions for various dashboard elements

/** Represents the direction of a trend (up, down, or flat) */
export type Trend = 'up' | 'down' | 'flat';

/** Represents the severity level of an alert */
export type AlertSeverity = 'critical' | 'warning' | 'info';

/** Represents the type of stream in the activity feed */
export type StreamType = 'portfolio' | 'compliance' | 'liquidity' | 'support';

/** Represents the color variant for tags */
export type TagVariant = 'violet' | 'emerald' | 'amber';

/** Represents the category of an action item */
export type ActionCategory = 'All entities' | 'Clubs' | 'Funds' | 'Compliance' | 'Liquidity';

/**
 * Represents a highlight value in the hero section
 */
export interface HeroHighlight {
  readonly label: string;
  readonly value: string;
  readonly delta: string;
}

/**
 * Represents the hero section data at the top of the dashboard
 */
export interface DashboardHero {
  readonly eyebrow: string;
  readonly title: string;
  readonly message: string;
  readonly highlight: HeroHighlight;
  readonly secondHighlight: HeroHighlight;
}

/**
 * Represents the wallet snapshot data
 */
export interface WalletSnapshot {
  readonly available: string;
  readonly pending: string;
  readonly deposits: string;
}

/**
 * Represents the rewards snapshot data
 */
export interface RewardsSnapshot {
  readonly tier: string;
  readonly nextMilestone: string;
  readonly progress: number;
  readonly streak: string;
}

/**
 * Represents a KPI (Key Performance Indicator) entry
 */
export interface KpiEntry {
  readonly label: string;
  readonly value: string;
  readonly delta: string;
  readonly trend: Trend;
  readonly caption: string;
}

/**
 * Represents an action item that requires user attention
 */
export interface ActionItem {
  readonly title: string;
  readonly meta: string;
  readonly due: string;
  readonly icon: string;
  readonly category: ActionCategory;
}

/**
 * Represents an opportunity card displayed on the dashboard
 */
export interface OpportunityCard {
  readonly title: string;
  readonly tag: string;
  readonly tagVariant: TagVariant;
  readonly irr: string;
  readonly horizon: string;
  readonly committed: string;
  readonly image: string;
}

/**
 * Represents a slice in the holdings allocation chart
 */
export interface HoldingsSlice {
  readonly label: string;
  readonly weight: number;
  readonly change: string;
}

/**
 * Represents a governance check item
 */
export interface GovernanceCheck {
  readonly title: string;
  readonly detail: string;
  readonly owner: string;
  readonly status: 'on-track' | 'at-risk';
}

/**
 * Represents a liquidity window item
 */
export interface LiquidityWindow {
  readonly asset: string;
  readonly amount: string;
  readonly window: string;
  readonly progress: number;
}

/**
 * Represents an item in the club pulse feed
 */
export type AvatarVariant = 'sky' | 'emerald' | 'amber' | 'violet';

export interface ClubPulseItem {
  readonly name: string;
  readonly headline: string;
  readonly action: string;
  readonly time: string;
  readonly avatarColor: AvatarVariant;
}

/**
 * Represents an activity event in the stream
 */
export interface ActivityEvent {
  readonly title: string;
  readonly detail: string;
  readonly time: string;
  readonly type: StreamType;
}

/**
 * Represents the complete state of dashboard data
 * This is the main data structure that contains all information
 * displayed on the dashboard.
 */
export interface DashboardDataState {
  readonly hero: DashboardHero;
  readonly wallet: WalletSnapshot;
  readonly rewards: RewardsSnapshot;
  readonly quickFilters: ReadonlyArray<ActionCategory>;
  readonly kpis: ReadonlyArray<KpiEntry>;
  readonly upcomingActions: ReadonlyArray<ActionItem>;
  readonly alerts: ReadonlyArray<{ title: string; meta: string; severity: AlertSeverity }>;
  readonly pipelines: ReadonlyArray<{ name: string; progress: number; owners: ReadonlyArray<string>; eta: string }>;
  readonly opportunities: ReadonlyArray<OpportunityCard>;
  readonly allocation: ReadonlyArray<HoldingsSlice>;
  readonly governanceChecks: ReadonlyArray<GovernanceCheck>;
  readonly liquidityWindows: ReadonlyArray<LiquidityWindow>;
  readonly clubPulse: ReadonlyArray<ClubPulseItem>;
  readonly activityStream: ReadonlyArray<ActivityEvent>;
}

/**
 * Interface for dashboard data sources
 * Defines the contract for any service that provides dashboard data
 */
export interface DashboardDataSource {
  state$(): Observable<DashboardDataState>;
}
