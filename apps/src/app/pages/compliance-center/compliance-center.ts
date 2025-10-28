import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import {
  AuditEntry,
  DocumentRow,
  RiskAlert,
  TaskItem,
  TimelineStage,
} from './compliance-center.types';

@Component({
  selector: 'app-compliance-center',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './compliance-center.html',
  styleUrl: './compliance-center.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplianceCenter {
  protected readonly completion = signal(75);

  protected readonly timeline: ReadonlyArray<TimelineStage> = [
    { name: 'Identity', status: 'done', icon: 'check_circle', description: 'Verified passport + selfie' },
    { name: 'Address', status: 'done', icon: 'check_circle', description: 'Utility bill collected' },
    { name: 'Accreditation', status: 'done', icon: 'check_circle', description: 'Questionnaire cleared' },
    { name: 'Source of funds', status: 'active', icon: 'pending', description: 'Awaiting bank statements' },
    { name: 'Tax forms', status: 'pending', icon: 'radio_button_unchecked', description: 'W-8BEN outstanding' },
    { name: 'Monitoring', status: 'pending', icon: 'radio_button_unchecked', description: 'Continuous AML checks' },
  ];

  protected readonly tasks: ReadonlyArray<TaskItem> = [
    {
      title: 'Verify source of funds',
      detail: 'Upload statements or notarised letter covering last 12 months inflows.',
      actionLabel: 'Upload document',
      due: 'Due in 2 days',
      icon: 'account_balance_wallet',
    },
    {
      title: 'Submit W-8BEN form',
      detail: 'Complete the tax declaration to keep distributions active.',
      actionLabel: 'Submit form',
      due: 'Due in 8 days',
      icon: 'description',
    },
  ];

  protected readonly documents: ReadonlyArray<DocumentRow> = [
    { name: 'Passport_scan.pdf', uploadedAt: '15 Nov 2025', status: 'approved', expiresAt: '14 Nov 2030' },
    { name: 'Utility_bill_oct.pdf', uploadedAt: '15 Nov 2025', status: 'approved', expiresAt: null },
    { name: 'Accreditation_cert.pdf', uploadedAt: '20 Nov 2025', status: 'review', expiresAt: '19 Nov 2027' },
  ];

  protected readonly alerts: ReadonlyArray<RiskAlert> = [
    {
      title: 'Accreditation expiring soon',
      detail: 'Your accredited investor questionnaire expires in 30 days. Update to retain secondary trading access.',
      cta: 'Review requirements',
    },
  ];

  protected readonly audit: ReadonlyArray<AuditEntry> = [
    { label: 'Accreditation status approved', timestamp: '20 Nov 2025 · 11:30 CET' },
    { label: 'Address verification submitted', timestamp: '15 Nov 2025 · 09:05 CET' },
    { label: 'Identity verification submitted', timestamp: '15 Nov 2025 · 09:01 CET' },
    { label: 'Account created', timestamp: '14 Nov 2025 · 15:45 CET' },
  ];

  protected readonly completionCopy = computed(
    () => `${this.completion()}% of compliance workflows finished`,
  );

  constructor() {
    console.debug('[ComplianceCenter] component ready', {
      completion: this.completion(),
      outstandingTasks: this.tasks.length,
    });
  }

  protected stageClass(stage: TimelineStage): string {
    switch (stage.status) {
      case 'done':
        return 'stage stage-done';
      case 'active':
        return 'stage stage-active';
      default:
        return 'stage stage-pending';
    }
  }
}
