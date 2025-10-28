import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LandingSeoService {
  private static readonly STRUCTURED_DATA_ID = 'landing-jsonld';

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  apply(): void {
    const pageTitle = 'Paradigma · Fractional club investing platform. Democratisizing Investment';
    const description =
      'Paradigma lets co-investment clubs pool funds, evaluate prime assets, and govern exits with trusted workflows.';
    const url = 'https://paradigma.example/';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://paradigma.example/assets/og-image.jpg' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://paradigma.example/assets/og-image.jpg' });

    this.injectStructuredData({ pageTitle, description, url });
    console.debug('[LandingSeoService] metadata applied', { pageTitle });
  }

  private injectStructuredData({ pageTitle, description, url }: { pageTitle: string; description: string; url: string }): void {
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Paradigma',
      url,
      logo: 'https://paradigma.example/assets/logo.png',
      sameAs: [
        'https://www.linkedin.com/company/paradigma',
        'https://twitter.com/paradigma',
      ],
      description,
    };

    const webPage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      headline: pageTitle,
      description,
      url,
      publisher: organization,
    };

    const payload = JSON.stringify({ '@graph': [organization, webPage] });
    const existing = this.document.getElementById(LandingSeoService.STRUCTURED_DATA_ID);

    if (existing) {
      existing.textContent = payload;
      return;
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = LandingSeoService.STRUCTURED_DATA_ID;
    script.textContent = payload;
    this.document.head.appendChild(script);
  }
}
