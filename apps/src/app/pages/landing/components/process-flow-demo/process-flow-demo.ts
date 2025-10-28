import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProcessFlow } from '../process-flow/process-flow';
import { Flow } from '../../../../models/landing';

@Component({
  selector: 'app-process-flow-demo',
  standalone: true,
  imports: [ProcessFlow],
  templateUrl: './process-flow-demo.html',
  styleUrl: './process-flow-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessFlowDemo {
  protected readonly flows: ReadonlyArray<Flow> = [
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
}