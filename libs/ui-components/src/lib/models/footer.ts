export interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface FooterLinkGroup {
  readonly title: string;
  readonly links: ReadonlyArray<FooterLink>;
}

export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: string;
  readonly pack?: string;
}

export interface FooterData {
  readonly company: {
    readonly name: string;
    readonly description: string;
    readonly logo?: string;
  };
  readonly links: ReadonlyArray<FooterLinkGroup>;
  readonly social: ReadonlyArray<SocialLink>;
  readonly legal: {
    readonly copyright: string;
    readonly privacy: FooterLink;
    readonly terms: FooterLink;
  };
  readonly newsletter: {
    readonly title: string;
    readonly description: string;
    readonly placeholder: string;
    readonly buttonText: string;
  };
}
