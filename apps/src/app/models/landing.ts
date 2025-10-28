export interface Problem {
  readonly title: string;
  readonly detail: string;
}

export interface Flow {
  readonly title: string;
  readonly summary: string;
  readonly steps: ReadonlyArray<string>;
}

export interface Metric {
  readonly label: string;
  readonly value: string;
  readonly data: ReadonlyArray<number>;
  readonly trend?: 'up' | 'down' | 'steady';
}

export interface Differentiator {
  readonly icon: string;
  readonly title: string;
  readonly copy: string;
}

export interface FAQ {
  readonly q: string;
  readonly a: string;
}
