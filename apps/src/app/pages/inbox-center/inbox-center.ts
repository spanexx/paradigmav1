import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  InboxMessage,
  InboxSection,
  NotificationItem,
  NotificationStatus,
} from './inbox-center.types';

@Component({
  selector: 'app-inbox-center',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './inbox-center.html',
  styleUrl: './inbox-center.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxCenter {
  protected readonly filter = signal<'all' | 'unread' | 'action'>('all');

  private readonly sections: ReadonlyArray<InboxSection> = [
    {
      title: 'Today',
      items: [
        {
          id: 'kyc-action',
          title: 'Action required · Verify identity',
          message:
            'Complete your KYC check to keep investing and enable withdrawals.',
          timestamp: '2 minutes ago',
          severity: 'critical',
          category: 'compliance',
          status: 'unread',
          actionLabel: 'Verify now',
          actionLink: '/compliance',
          tags: ['Action required'],
        },
        {
          id: 'dividend-update',
          title: 'Dividend payout · Solar Fund IV',
          message:
            '€245.60 has been credited to your wallet from Solar Fund IV.',
          timestamp: '1 hour ago',
          severity: 'success',
          category: 'investment',
          status: 'unread',
          actionLabel: 'View details',
          actionLink: '/wallet',
          tags: ['Update'],
        },
      ],
    },
    {
      title: 'Yesterday',
      items: [
        {
          id: 'platform-update',
          title: 'Platform update · New analytics',
          message:
            'Portfolio analytics and enhanced reporting are now available.',
          timestamp: 'Oct 23 · 16:15',
          severity: 'info',
          category: 'system',
          status: 'read',
        },
        {
          id: 'wallet-deposit',
          title: 'Deposit confirmed · €5,000',
          message: 'Your transfer is cleared and funds are ready to deploy.',
          timestamp: 'Oct 23 · 09:30',
          severity: 'success',
          category: 'wallet',
          status: 'read',
        },
      ],
    },
  ];

  protected readonly filteredSections = computed(() =>
    this.sections.map((section) => ({
      ...section,
      items: section.items.filter((item) => this.matchesFilter(item)),
    })),
  );

  protected readonly unreadCount = computed(() =>
    this.sections.reduce(
      (count, section) =>
        count + section.items.filter((item) => item.status === 'unread').length,
      0,
    ),
  );

  protected readonly selected = signal<InboxMessage | null>(null);

  constructor() {
    console.debug('[InboxCenter] component ready', {
      sections: this.sections.length,
      unread: this.unreadCount(),
    });
    const firstUnread = this.sections.flatMap((section) => section.items).find((item) => item.status === 'unread');
    if (firstUnread) {
      this.openMessage(firstUnread);
    }
  }

  protected iconFor(severity: NotificationItem['severity']): string {
    const map: Record<NotificationItem['severity'], string> = {
      info: 'info',
      success: 'check_circle',
      warning: 'warning',
      critical: 'error',
    };
    return map[severity];
  }

  protected current(): InboxMessage | null {
    return this.selected();
  }

  protected setFilter(value: 'all' | 'unread' | 'action'): void {
    this.filter.set(value);
    console.debug('[InboxCenter] filter changed', { filter: value });
  }

  protected openMessage(notification: NotificationItem): void {
    const message: InboxMessage = {
      notification,
      metadata: [
        { label: 'Category', value: notification.category },
        { label: 'Severity', value: notification.severity, icon: 'flag' },
        { label: 'Status', value: notification.status },
      ],
      body:
        'Stay compliant and secure. Provide the requested information so we can continue servicing your account without disruption. We keep copies in encrypted storage and never share them externally.',
    };
    this.selected.set(message);

    if (notification.status === 'unread') {
      this.markAsRead(notification.id);
    }

    console.debug('[InboxCenter] message opened', { id: notification.id });
  }

  protected isEmpty(section: InboxSection): boolean {
    return section.items.length === 0;
  }

  private matchesFilter(item: NotificationItem): boolean {
    switch (this.filter()) {
      case 'unread':
        return item.status === 'unread';
      case 'action':
        return item.tags?.includes('Action required') ?? false;
      default:
        return true;
    }
  }

  private markAsRead(id: string): void {
    this.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.id === id) {
          (item as { status: NotificationStatus }).status = 'read';
        }
      });
    });
  }
}
