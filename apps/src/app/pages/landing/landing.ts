import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, effect } from '@angular/core';
import { NgIf, DatePipe } from '@angular/common';
import { ProblemsSection } from './components/problems-section/problems-section';
import { FlowsSection } from './components/flows-section/flows-section';
import { DifferentiatorsSection } from './components/differentiators-section/differentiators-section';
import { FaqsSection } from './components/faqs-section/faqs-section';
import { MetricsSection } from './components/metrics-section/metrics-section';
import { HeroCta } from '@paradigma/ui-components';
import { Problem, Flow, Differentiator, FAQ, Metric } from '../../models/landing';
import { ProcessFlowSection } from './components/process-flow-section/process-flow-section';
import {
  HERO_CONTENT,
  HERO_STATS,
  METRICS_CONTENT,
  PROBLEMS_CONTENT,
  FLOWS_CONTENT,
  DIFFERENTIATORS_CONTENT,
  FAQS_CONTENT,
  INFOGRAPHIC_STORY,
} from './landing.content';
import { LandingSeoService } from './landing-seo.service';
import { NetworkStatusService } from '../../services/network-status.service';
import { StorytellingSection } from './components/storytelling-section/storytelling-section';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    ProblemsSection, 
    FlowsSection, 
    DifferentiatorsSection, 
    FaqsSection, 
    MetricsSection,
    HeroCta,
    ProcessFlowSection,
    StorytellingSection,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing implements OnInit {
  protected readonly hero = HERO_CONTENT;
  protected readonly heroStats = HERO_STATS;
  protected metrics: ReadonlyArray<Metric> = METRICS_CONTENT;
  protected readonly problems: ReadonlyArray<Problem> = PROBLEMS_CONTENT;
  protected readonly flows: ReadonlyArray<Flow> = FLOWS_CONTENT;
  protected readonly differentiators: ReadonlyArray<Differentiator> = DIFFERENTIATORS_CONTENT;
  protected readonly faqs: ReadonlyArray<FAQ> = FAQS_CONTENT;
  protected readonly story = INFOGRAPHIC_STORY;

  protected cachedTimestamp: string | null = null;
  protected flowsLoading = true;
  protected processLoading = true;

  // Flag to control which flow visualization to show on mobile
  protected showProcessFlow = false;

  toggleFlowVisualization(): void {
    this.showProcessFlow = !this.showProcessFlow;
  }

  constructor(
    private readonly seo: LandingSeoService,
    protected readonly networkStatus: NetworkStatusService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    console.debug('[Landing] component ready');

    effect(() => {
      const offline = this.networkStatus.offline();
      const cached = this.networkStatus.cachedLandingPayload();
      const cachedAt = this.networkStatus.cachedAt();

      this.cachedTimestamp = cachedAt;

      if (!offline) {
        this.metrics = METRICS_CONTENT;
      } else if (cached) {
        this.metrics = cached.metrics;
        console.debug('[Landing] hydrated metrics from cache', { cachedAt, count: cached.metrics.length });
      } else {
        console.debug('[Landing] offline with no cached payload available');
      }

      console.debug('[Landing] network status change detected', { offline, cachedAt });
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.seo.apply();
    if (!this.networkStatus.offline()) {
      this.networkStatus.cacheLandingPayload({
        hero: this.hero,
        heroStats: this.heroStats,
        metrics: METRICS_CONTENT,
      });
    }

    queueMicrotask(() => {
      this.flowsLoading = false;
      this.processLoading = false;
      this.cdr.markForCheck();
      console.debug('[Landing] flow data ready');
    });
  }
}

