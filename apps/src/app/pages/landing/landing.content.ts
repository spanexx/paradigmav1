import { Differentiator, FAQ, Flow, Metric, Problem } from '../../models/landing';

export interface HeroContent {
  eyebrow: string;
  title: string;
  message: string;
  primaryCta: string;
  secondaryCta: string;
  tags: ReadonlyArray<string>;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface InfographicStage {
  readonly step: string;
  readonly title: string;
  readonly stat: string;
  readonly description: string;
}

export interface InfographicStory {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly stages: ReadonlyArray<InfographicStage>;
}

export const HERO_CONTENT: HeroContent = {
  eyebrow: 'Invest together with clarity',
  title: 'Fractional ownership without the friction.',
  message: 'Paradigma lets small teams pool funds, pick assets, and track performance with tools built for trust.',
  primaryCta: 'Start exploring assets',
  secondaryCta: 'See how it works',
  tags: ['Private markets', 'Renewables', 'Hotel clubs', 'Digital art', 'Tokenized real estate'],
};

export const HERO_STATS: ReadonlyArray<HeroStat> = [
  { value: '€245M+', label: 'Assets reviewed by experts' },
  { value: '12k', label: 'Club members building portfolios' },
  { value: '48h', label: 'Average liquidity event response' },
];

export const METRICS_CONTENT: ReadonlyArray<Metric> = [
  { label: 'Deals funded', value: '162', data: [28, 32, 35, 41, 46, 58, 62, 70], trend: 'up' },
  { label: 'Average IRR', value: '18.4%', data: [12, 14, 16, 15, 18, 19, 18, 18.4], trend: 'steady' },
  { label: 'Exit velocity', value: '2.4x', data: [1.1, 1.3, 1.6, 1.7, 2.0, 2.1, 2.2, 2.4], trend: 'up' },
];

export const PROBLEMS_CONTENT: ReadonlyArray<Problem> = [
  {
    title: 'High entry tickets',
    detail: 'Join vetted co-investment clubs to split the capital required for prime assets.',
  },
  {
    title: 'Hard to trust strangers',
    detail: 'Transparent governance, escrow wallets, and digital agreements keep every partner aligned.',
  },
  {
    title: 'Slow exits',
    detail: 'Secondary windows and wallet automation help you move in and out of positions quickly.',
  },
];

export const FLOWS_CONTENT: ReadonlyArray<Flow> = [
  {
    title: 'Discover',
    summary: 'Filter by ticket size, location, and asset type to find the right club.',
    steps: ['Rich asset cards with projected returns', 'Manager bios and diligence attachments', 'Schedule live or virtual tours'],
  },
  {
    title: 'Invest',
    summary: 'Complete KYC once, fund your Para wallet, and sign digital agreements.',
    steps: ['Escrow-backed wallet with Para Token', 'Automated document storage', 'Smart alerts for closing milestones'],
  },
  {
    title: 'Manage',
    summary: 'Track valuations, plan exits, and celebrate wins with your club.',
    steps: ['Live portfolio dashboards', 'Sell order workflows with guardrails', 'Badges and leaderboards for progress'],
  },
];

export const DIFFERENTIATORS_CONTENT: ReadonlyArray<Differentiator> = [
  {
    icon: 'verified_user',
    title: 'Compliance included',
    copy: 'Regulated onboarding, audits, and dispute support keep every deal above board.',
  },
  {
    icon: 'forum',
    title: 'Community-first',
    copy: 'Clubs, chat, and shared visits turn co-ownership into long-term relationships.',
  },
  {
    icon: 'bolt',
    title: 'Actionable insights',
    copy: 'Explainable metrics show what drives appreciation so you always know the why.',
  },
];

export const FAQS_CONTENT: ReadonlyArray<FAQ> = [
  {
    q: 'Who can join a club?',
    a: 'Verified members who complete KYC and meet the minimum ticket for that asset.',
  },
  {
    q: 'How liquid are the investments?',
    a: 'Paradigma runs recurring secondary windows so you can sell to club members or incoming buyers.',
  },
  {
    q: 'Do I keep custody of funds?',
    a: 'Deposits sit in an insured escrow wallet until agreements are signed and conditions are met.',
  },
];

export const INFOGRAPHIC_STORY: InfographicStory = {
  eyebrow: 'Club impact, in one glance',
  title: 'A transparent journey from idea to exit',
  summary: 'See how Paradigma guides capital from the first discovery call through to a celebrated liquidity event.',
  stages: [
    {
      step: '01',
      title: 'Assemble your members',
      stat: '6 invites accepted',
      description: 'Launch a dedicated workspace, invite partners, and lock in aligned investment goals.',
    },
    {
      step: '02',
      title: 'Evaluate the deal',
      stat: '14 diligence artifacts',
      description: 'Collaborate on docs, surface red flags, and model returns with guided workflows.',
    },
    {
      step: '03',
      title: 'Fund with confidence',
      stat: '€2.8M coordinated',
      description: 'Move capital into escrow wallets, execute agreements, and automate capital calls.',
    },
    {
      step: '04',
      title: 'Celebrate the exit',
      stat: '2.4x realized',
      description: 'Distribute returns, capture lessons learned, and queue the next opportunity.',
    },
  ],
};
