import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './components/app-header/app-header';
import { AppNavItem } from './models/navigation';
import { Footer } from '@paradigma/ui-components';

interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

interface FooterLinkGroup {
  readonly title: string;
  readonly links: ReadonlyArray<FooterLink>;
}

interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: string;
}

interface FooterData {
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeader, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly navItems: ReadonlyArray<AppNavItem> = [
    { label: 'Home', href: '/' },
    { label: 'Discover', href: '/discover' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Compliance', href: '/compliance' },
    { label: 'Rewards', href: '/rewards' },
    { label: 'Inbox', href: '/inbox' },
    { label: 'Support', href: '/support' },
    { label: 'Tour', href: '/tour' },
  ];

  protected readonly footerData: FooterData = {
    company: {
      name: 'Paradigma',
      description: 'The modern platform for fractional investment in prime assets. Join thousands of investors building wealth together through transparent, regulated co-ownership.',
    },
    links: [
      {
        title: 'Platform',
        links: [
          { label: 'Browse Assets', href: '/assets' },
          { label: 'Investment Clubs', href: '/clubs' },
          { label: 'Portfolio Dashboard', href: '/dashboard' },
          { label: 'Market Insights', href: '/insights' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'How It Works', href: '/how-it-works' },
          { label: 'Investment Guide', href: '/guide' },
          { label: 'Risk Assessment', href: '/risk' },
          { label: 'API Documentation', href: '/docs', external: true },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help Center', href: '/help' },
          { label: 'Contact Us', href: '/contact' },
          { label: 'Community Forum', href: '/community', external: true },
          { label: 'Status Page', href: '/status', external: true },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Cookie Policy', href: '/cookies' },
          { label: 'Compliance', href: '/compliance' },
        ],
      },
    ],
    social: [
      { name: 'Twitter', url: 'https://twitter.com/paradigma', icon: 'twitter' },
      { name: 'LinkedIn', url: 'https://linkedin.com/company/paradigma', icon: 'linkedin' },
      { name: 'GitHub', url: 'https://github.com/paradigma', icon: 'github' },
      { name: 'Discord', url: 'https://discord.gg/paradigma', icon: 'discord' },
    ],
    legal: {
      copyright: '© 2025 Paradigma. All rights reserved.',
      privacy: { label: 'Privacy Policy', href: '/privacy' },
      terms: { label: 'Terms of Service', href: '/terms' },
    },
    newsletter: {
      title: 'Stay Updated',
      description: 'Get the latest investment opportunities and platform updates delivered to your inbox.',
      placeholder: 'Enter your email address',
      buttonText: 'Subscribe',
    },
  };

  constructor() {
    console.debug('[AppShell] bootstrapped');
  }

  protected setActive(href: string): void {
    console.debug('[AppShell] nav changed', { href });
  }

  protected onNewsletterSubscribe(email: string): void {
    console.debug('[AppShell] newsletter subscription', { email });
    // TODO: Implement newsletter subscription logic
  }
}
