export interface TourHotspot {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly links: ReadonlyArray<{ label: string; href: string }>;
}

export interface TourScene {
  readonly label: string;
  readonly icon: string;
}

export interface TourComment {
  readonly author: string;
  readonly avatar: string;
  readonly timestamp: string;
  readonly message: string;
  readonly attachment?: string;
}
