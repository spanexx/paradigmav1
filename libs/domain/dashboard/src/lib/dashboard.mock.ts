/**
 * Dashboard Mock Data
 * 
 * This file contains mock data that simulates the dashboard state.
 * It's used as the initial data source for the DashboardDataService
 * and can be helpful for development and testing before real data
 * is available from an API.
 */
import { DashboardDataState } from './models/dashboard.models';

// Complete mock state for the dashboard with realistic sample data
export const DASHBOARD_MOCK_STATE: DashboardDataState = {
  hero: {
    eyebrow: 'Investor mission control',
    title: 'Keep capital deployed, compliant, and connected.',
    message: 'Monitor wallets, approve diligence, and guide clubs through exits with live collaboration signals.',
    highlight: {
      label: 'Live NAV',
      value: '€245.2M',
      delta: '+2.6% daily',
    },
    secondHighlight: {
      label: 'Liquidity runway',
      value: '42 days',
      delta: '↑ gaining 4 days WoW',
    },
  },
  wallet: {
    available: '€5.2M liquid',
    pending: '€1.3M pending settlements',
    deposits: '+€820K past 7 days',
  },
  rewards: {
    tier: 'Gold',
    nextMilestone: '€2.5M additional invested to reach Platinum',
    progress: 60,
    streak: '9-week streak of club engagements',
  },
  quickFilters: ['All entities', 'Clubs', 'Funds', 'Compliance', 'Liquidity'],
  kpis: [
    { label: 'Money under management', value: '€245.2M', delta: '+2.6%', trend: 'up', caption: 'VS yesterday' },
    { label: 'Fresh capital this month', value: '€8.4M', delta: '+14.2%', trend: 'up', caption: 'Confirmed deposits' },
    { label: 'Compliance on time', value: '94%', delta: '-3.1%', trend: 'down', caption: 'Resolutions in 24h' },
    { label: 'Cash already allocated', value: '68%', delta: 'steady', trend: 'flat', caption: 'Target band 65-75%' },
  ],
  upcomingActions: [
    {
      title: "Close diligence on 'Horizon Battery Park'",
      meta: 'Assign reviewers across legal + market',
      due: 'Due today · 2 tasks open',
      icon: 'bolt',
      category: 'Funds',
    },
    {
      title: 'Approve onboarding for Meridian Guild',
      meta: 'KYC docs validated, signature pending',
      due: 'Due in 18h',
      icon: 'task_alt',
      category: 'Compliance',
    },
    {
      title: 'Schedule portfolio retro for Club Aurora',
      meta: 'Align investors on Q4 rebalancing',
      due: 'Due tomorrow',
      icon: 'event_available',
      category: 'Clubs',
    },
    {
      title: 'Trigger liquidity window for Fund II',
      meta: 'Queued investors worth €1.9M',
      due: 'Opens next Tuesday',
      icon: 'waterfall_chart',
      category: 'Liquidity',
    },
  ],
  alerts: [
    { title: 'Aurora Club KYC still waiting', meta: 'Due in 18 hours', severity: 'critical' },
    { title: 'Fund II cash buffer is getting low', meta: 'Add funds before 16:00 CET', severity: 'warning' },
    { title: 'Escrow reconciliation complete', meta: 'Synced 12 minutes ago', severity: 'info' },
  ],
  pipelines: [
    { name: 'Horizon Battery Park diligence', progress: 72, owners: ['MB', 'JK'], eta: 'Wrap in 3 days' },
    { name: 'Meridian Guild onboarding', progress: 48, owners: ['LP'], eta: 'Finish in 8 days' },
    { name: 'Secondary auction window', progress: 86, owners: ['Team T'], eta: 'Closing today' },
  ],
  opportunities: [
    {
      title: 'Northwind Battery Campus',
      tag: 'Green infra',
      tagVariant: 'emerald',
      irr: '18.2% IRR',
      horizon: '4.5y horizon',
      committed: '€4.1M committed',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Apex Residences Co-invest',
      tag: 'City living',
      tagVariant: 'violet',
      irr: '16.4% IRR',
      horizon: '3.2y horizon',
      committed: '€2.6M committed',
      image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Calibre Vintage Fund',
      tag: 'Collectibles',
      tagVariant: 'amber',
      irr: '12.5% APY',
      horizon: 'Rolling 18 months',
      committed: '€940K committed',
      image: 'https://images.unsplash.com/photo-1524594154908-edd3030f1f83?auto=format&fit=crop&w=900&q=80',
    },
  ],
  allocation: [
    { label: 'Real assets', weight: 38, change: '+1.2%' },
    { label: 'Private credit', weight: 24, change: '+0.4%' },
    { label: 'Venture', weight: 18, change: '-0.6%' },
    { label: 'Digital assets', weight: 12, change: '+0.8%' },
    { label: 'Cash', weight: 8, change: '-1.1%' },
  ],
  governanceChecks: [
    {
      title: 'Audit Trail sync',
      detail: '14 agreements notarised · On-chain proofs updated',
      owner: 'Compliance · Rivera',
      status: 'on-track',
    },
    {
      title: 'Legal concierge backlog',
      detail: '2 concierge requests waiting for signatures',
      owner: 'Legal · Onye',
      status: 'at-risk',
    },
  ],
  liquidityWindows: [
    {
      asset: 'Fund II secondary swap',
      amount: '€1.9M queued',
      window: 'Opens next Tue',
      progress: 64,
    },
    {
      asset: 'Aurora Club treasury release',
      amount: '€620K settled',
      window: 'Closing today',
      progress: 86,
    },
  ],
  clubPulse: [
    {
      name: 'Club Aurora',
      headline: 'Drafted new exit waterfall',
      action: 'Review @legal',
      time: '6m ago',
      avatarColor: 'sky',
    },
    {
      name: 'Meridian Guild',
      headline: 'KYC docs cleared + 2 pending peers',
      action: 'Assign sponsor',
      time: '24m ago',
      avatarColor: 'emerald',
    },
    {
      name: 'Atlas Renewables',
      headline: 'Virtual tour ready · 30 seats left',
      action: 'Share with pipeline',
      time: '1h ago',
      avatarColor: 'amber',
    },
  ],
  activityStream: [
    { title: 'Club Aurora raised a call', detail: '€1.6M spread across partners', time: '6m ago', type: 'portfolio' },
    { title: 'Compliance bot cleared 12 KYC tickets', detail: 'Median time 38 minutes', time: '18m ago', type: 'compliance' },
    { title: 'Treasury locked FX hedge for Fund III', detail: '€2.3M booked at 1.07 rate', time: '44m ago', type: 'liquidity' },
    { title: 'Support flagged a VIP onboarding', detail: 'Needs welcome call ASAP', time: '1h ago', type: 'support' },
  ],
};
