export interface HeroAction {
  readonly label: string;
  readonly icon: string;
  readonly variant: 'primary' | 'secondary' | 'ghost';
}

export interface TicketSummary {
  readonly headline: string;
  readonly detail: string;
  readonly cta: string;
}

export interface SelfServiceCard {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface KnowledgeArticle {
  readonly title: string;
  readonly body: string;
  readonly category: string;
}

export interface ContactOption {
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly action: string;
  readonly variant: 'primary' | 'secondary';
}
