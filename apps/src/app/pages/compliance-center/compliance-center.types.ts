export interface TimelineStage {
  readonly name: string;
  readonly status: 'done' | 'active' | 'pending';
  readonly icon: string;
  readonly description: string;
}

export interface TaskItem {
  readonly title: string;
  readonly detail: string;
  readonly actionLabel: string;
  readonly due: string;
  readonly icon: string;
}

export interface DocumentRow {
  readonly name: string;
  readonly uploadedAt: string;
  readonly status: 'approved' | 'review' | 'missing';
  readonly expiresAt: string | null;
}

export interface RiskAlert {
  readonly title: string;
  readonly detail: string;
  readonly cta: string;
}

export interface AuditEntry {
  readonly label: string;
  readonly timestamp: string;
}
