export type NotificationSeverity = 'info' | 'success' | 'warning' | 'critical';
export type NotificationStatus = 'unread' | 'read';
export type NotificationCategory = 'compliance' | 'investment' | 'system' | 'wallet';

export interface NotificationItem {
  readonly id: string;
  readonly title: string;
  readonly message: string;
  readonly timestamp: string;
  readonly severity: NotificationSeverity;
  readonly category: NotificationCategory;
  readonly status: NotificationStatus;
  readonly actionLabel?: string;
  readonly actionLink?: string;
  readonly tags?: ReadonlyArray<string>;
}

export interface InboxSection {
  readonly title: string;
  readonly items: ReadonlyArray<NotificationItem>;
}

export interface MetadataField {
  readonly label: string;
  readonly value: string;
  readonly icon?: string;
}

export interface InboxMessage {
  readonly notification: NotificationItem;
  readonly metadata: ReadonlyArray<MetadataField>;
  readonly body: string;
}
