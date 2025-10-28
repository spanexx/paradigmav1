import { Route } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { provideDashboardFeature, DashboardShell } from '@paradigma/dashboard-feature';
import { ProcessFlowDemo } from './pages/landing/components/process-flow-demo/process-flow-demo';
import { AssetDiscovery } from './pages/asset-discovery/asset-discovery';
import { PortfolioOverview } from './pages/portfolio-overview/portfolio-overview';
import { ComplianceCenter } from './pages/compliance-center/compliance-center';
import { RewardsCenter } from './pages/rewards-center/rewards-center';
import { InboxCenter } from './pages/inbox-center/inbox-center';
import { SupportCenter } from './pages/support-center/support-center';
import { TourExperience } from './pages/tour-experience/tour-experience';

export const appRoutes: Route[] = [
  { path: '', component: Landing, title: 'Paradigma · Invest together' },
  {
    path: 'dashboard',
    loadComponent: () => DashboardShell,
    providers: [provideDashboardFeature()],
    title: 'Paradigma Command Center',
  },
  { path: 'discover', component: AssetDiscovery, title: 'Paradigma · Discover assets' },
  { path: 'portfolio', component: PortfolioOverview, title: 'Paradigma · Portfolio overview' },
  { path: 'compliance', component: ComplianceCenter, title: 'Paradigma · Compliance center' },
  { path: 'rewards', component: RewardsCenter, title: 'Paradigma · Rewards center' },
  { path: 'inbox', component: InboxCenter, title: 'Paradigma · Notifications & inbox' },
  { path: 'support', component: SupportCenter, title: 'Paradigma · Support center' },
  { path: 'tour', component: TourExperience, title: 'Paradigma · Virtual tour experience' },
  { path: 'process-flow-demo', component: ProcessFlowDemo, title: 'Process Flow Demo' },
  { path: '**', redirectTo: '' },
];
