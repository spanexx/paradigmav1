import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ActivityItem,
  Mission,
  ProgressBreakdown,
  ReferralStats,
  RewardCatalogItem,
  RewardTier,
} from './rewards-center.types';

@Component({
  selector: 'app-rewards-center',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, DecimalPipe],
  templateUrl: './rewards-center.html',
  styleUrl: './rewards-center.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardsCenter {
  protected readonly currentTier = 'Silver member';
  protected readonly points = { current: 1500, target: 2500 } as const;

  protected readonly tiers: ReadonlyArray<RewardTier> = [
    {
      name: 'Bronze tier',
      description: 'Standard fees and core platform access.',
      image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=640&q=80',
    },
    {
      name: 'Silver tier',
      description: 'Reduced fees, club rooms, and referrals.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=640&q=80',
      highlight: true,
    },
    {
      name: 'Gold tier',
      description: 'Early deal access and concierge check-ins.',
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=640&q=80',
    },
    {
      name: 'Platinum tier',
      description: 'Exclusive events, liquidity priority, white-glove support.',
      image: 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?auto=format&fit=crop&w=640&q=80',
    },
  ];

  protected readonly breakdown: ReadonlyArray<ProgressBreakdown> = [
    { label: 'Investment points', icon: 'trending_up', points: 800 },
    { label: 'Referral bonus', icon: 'group_add', points: 500 },
    { label: 'Mission rewards', icon: 'military_tech', points: 200 },
  ];

  protected readonly activity: ReadonlyArray<ActivityItem> = [
    { icon: 'add_shopping_cart', summary: 'New investment · +100 pts', timestamp: '2 hours ago' },
    { icon: 'task_alt', summary: 'Completed mission · +50 pts', timestamp: '1 day ago' },
    { icon: 'group_add', summary: 'Referral funded · +250 pts', timestamp: '3 days ago' },
  ];

  protected readonly missions: ReadonlyArray<Mission> = [
    {
      title: 'Complete your first investment',
      description: 'Commit to any live deal to unlock the welcome bonus.',
      points: 100,
      action: 'Invest now',
      cta: '/discover',
    },
    {
      title: 'Read 3 educational briefs',
      description: 'Grow smarter with curated market and asset memos.',
      points: 25,
      action: 'Start learning',
      cta: '/learn',
    },
    {
      title: 'Refer a friend who invests',
      description: 'Invite partners to co-invest and share intelligence.',
      points: 250,
      action: 'Share invite',
      cta: '/referrals',
    },
    {
      title: 'Join the next community AMA',
      description: 'Attend an AMA with a lead manager or legal counsel.',
      points: 50,
      action: 'Upcoming',
      cta: '#',
      disabled: true,
    },
  ];

  protected readonly catalog: ReadonlyArray<RewardCatalogItem> = [
    {
      title: 'Investment fee rebate',
      description: '5% rebate automatically applied to your next allocation.',
      cost: 'Redeem · 500 pts',
      icon: 'percent',
    },
    {
      title: 'Paradigma field kit',
      description: 'Premium tee, notebook, and enamel pin to welcome new investors.',
      cost: 'Redeem · 1,000 pts',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=640&q=80',
    },
    {
      title: 'Priority deal alerts',
      description: 'Get notified before the crowd on high-demand allocations.',
      cost: 'Redeem · 2,500 pts',
      icon: 'rocket_launch',
    },
    {
      title: 'Financial Times digital pass',
      description: 'One month of premium global markets coverage.',
      cost: 'Redeemed',
      icon: 'newspaper',
      disabled: true,
    },
  ];

  protected readonly referrals: ReferralStats = {
    link: 'https://paradigma.fi/invite/aBcDeFg123',
    referrals: 5,
    points: 1250,
  } as const;

  protected readonly progressCopy = computed(() => {
    const { current, target } = this.points;
    const remaining = target - current;
    return `${current.toLocaleString()} / ${target.toLocaleString()} pts · ${remaining.toLocaleString()} to Gold`;
  });

  constructor() {
    console.debug('[RewardsCenter] ready', {
      tier: this.currentTier,
      points: this.points,
    });
  }
}
