import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import {
  ContactOption,
  HeroAction,
  KnowledgeArticle,
  SelfServiceCard,
  TicketSummary,
} from './support-center.types';

@Component({
  selector: 'app-support-center',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './support-center.html',
  styleUrl: './support-center.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportCenter {
  protected readonly heroActions: ReadonlyArray<HeroAction> = [
    { label: 'Start live chat', icon: 'chat', variant: 'primary' },
    { label: 'Submit ticket', icon: 'confirmation_number', variant: 'secondary' },
    { label: 'Report dispute', icon: 'flag', variant: 'ghost' },
  ];

  protected readonly ticketSummary: TicketSummary = {
    headline: 'You have 3 active tickets',
    detail: '1 in progress, 1 pending, 1 escalated. Track updates in your ticket dashboard.',
    cta: 'View ticket dashboard',
  };

  protected readonly selfService: ReadonlyArray<SelfServiceCard> = [
    { icon: 'person', title: 'Account management', description: 'Update profile, security, notifications, and legal preferences.' },
    { icon: 'school', title: 'Investing 101', description: 'Understand Paradigma clubs, asset diligence, and governance.' },
    { icon: 'pie_chart', title: 'Fractional assets', description: 'Learn how allocations work and how to manage holdings.' },
    { icon: 'security', title: 'Security', description: 'Secure your account with MFA, passkeys, and device controls.' },
    { icon: 'receipt_long', title: 'Taxes & reporting', description: 'Retrieve statements, tax packs, and export CSV summaries.' },
    { icon: 'payments', title: 'Fees', description: 'See fee schedules, rebates, and discount tiers.' },
  ];

  protected readonly knowledgeArticles: ReadonlyArray<KnowledgeArticle> = [
    {
      title: 'How do I fund my account?',
      body: 'Fund via SEPA, ACH, or wire. Deposits settle in 2-5 business days and unlock immediately for allocations.',
      category: 'Funding',
    },
    {
      title: 'What are fractional assets?',
      body: 'Fractional assets let you co-own institutional-grade assets via special purpose vehicles with transparent governance.',
      category: 'Investing',
    },
    {
      title: 'How is my investment secured?',
      body: 'Assets are held by regulated custodians, with escrow wallets and notarised contracts backing each allocation.',
      category: 'Security',
    },
  ];

  protected readonly contactOptions: ReadonlyArray<ContactOption> = [
    { icon: 'chat', title: 'Live chat', subtitle: 'Mon–Fri · 9:00–17:00 CET', action: 'Start chat', variant: 'primary' },
    { icon: 'support_agent', title: 'Request a callback', subtitle: 'Average response < 2 hours', action: 'Request call', variant: 'secondary' },
    { icon: 'mail', title: 'Email support', subtitle: 'Replies inside 24 hours', action: 'Send email', variant: 'secondary' },
  ];

  protected readonly helpfulPrompt = computed(() => 'Was this page helpful? Your feedback tunes our next iteration.');

  constructor() {
    console.debug('[SupportCenter] component ready', {
      actions: this.heroActions.length,
      articles: this.knowledgeArticles.length,
    });
  }
}
