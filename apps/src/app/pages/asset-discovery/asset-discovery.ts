import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  AssetCard,
  FilterGroup,
  RiskBand,
  SortKey,
  SustainabilityTag,
  TicketBand,
} from './asset-discovery.types';

@Component({
  selector: 'app-asset-discovery',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './asset-discovery.html',
  styleUrl: './asset-discovery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetDiscovery {
  protected readonly breadcrumbs = ['Home', 'Discover', 'Real estate'];

  protected readonly sortOptions: ReadonlyArray<{ label: string; value: SortKey }> = [
    { label: 'IRR (High to Low)', value: 'irr-desc' },
    { label: 'Newest', value: 'newest' },
    { label: 'Min. Investment', value: 'min-ticket' },
  ];

  protected activeSort = signal<SortKey>('irr-desc');
  protected activeRisk = signal<RiskBand>('Low');
  protected activeTicket = signal<TicketBand>('Low');

  protected readonly ticketBands: ReadonlyArray<TicketBand> = ['Low', 'Mid', 'High'];
  protected readonly riskBands: ReadonlyArray<RiskBand> = ['Low', 'Medium', 'High'];

  protected readonly assetTypeFilters: FilterGroup<string> = {
    title: 'Asset type',
    options: ['Real estate', 'Private credit', 'Venture', 'Collectibles'],
  };

  protected readonly sustainabilityFilters: FilterGroup<SustainabilityTag> = {
    title: 'Sustainability tag',
    options: ['ESG Compliant', 'Green Energy', 'Impact Ready'],
  };

  protected readonly recommendedHeadline =
    'High-yield co-ownership backed by audited governance streams.';

  protected readonly deals: ReadonlyArray<AssetCard> = [
    {
      title: 'Northwind Battery Campus',
      manager: 'Flux Partners',
      location: 'Rotterdam, NL',
      minimum: '€5,000 min.',
      irr: '18.2% target IRR',
      term: '4.5 year hold',
      fundingProgress: 72,
      statusBadge: 'HOT',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=960&q=80',
      sustainability: ['Green Energy'],
    },
    {
      title: 'Apex Residences Phase II',
      manager: 'UrbanVest',
      location: 'Lisbon, PT',
      minimum: '€3,500 min.',
      irr: '16.4% target IRR',
      term: '3.2 year hold',
      fundingProgress: 48,
      statusBadge: 'NEW',
      image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=960&q=80',
      sustainability: ['Impact Ready'],
    },
    {
      title: 'Aurora Timber Residences',
      manager: 'Nordic Habitat',
      location: 'Oslo, NO',
      minimum: '€2,000 min.',
      irr: '14.8% target IRR',
      term: '5 year hold',
      fundingProgress: 91,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=960&q=80',
      sustainability: ['ESG Compliant'],
    },
    {
      title: 'Meridian Waterfront Villas',
      manager: 'Coastal Collective',
      location: 'Valencia, ES',
      minimum: '€6,500 min.',
      irr: '19.6% target IRR',
      term: '6 year hold',
      fundingProgress: 36,
      statusBadge: 'NEW',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=960&q=80',
      sustainability: ['Impact Ready', 'Green Energy'],
    },
    {
      title: 'Atlas Logistics Hubs',
      manager: 'InfraLine',
      location: 'Warsaw, PL',
      minimum: '€4,000 min.',
      irr: '17.5% target IRR',
      term: '7 year hold',
      fundingProgress: 58,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=960&q=80',
      sustainability: ['ESG Compliant'],
    },
    {
      title: 'Helios Agritech Fields',
      manager: 'TerraBloom',
      location: 'Seville, ES',
      minimum: '€1,800 min.',
      irr: '13.2% target IRR',
      term: '4 year hold',
      fundingProgress: 64,
      image: 'https://images.unsplash.com/photo-1523345863768-2462f3c6c061?auto=format&fit=crop&w=960&q=80',
      sustainability: ['Green Energy'],
    },
  ];

  constructor() {
    console.debug('[AssetDiscovery] component ready', {
      sort: this.activeSort(),
      risk: this.activeRisk(),
    });
  }

  protected setRisk(risk: RiskBand): void {
    this.activeRisk.set(risk);
    console.debug('[AssetDiscovery] risk filter changed', { risk });
  }

  protected setTicket(band: TicketBand): void {
    this.activeTicket.set(band);
    console.debug('[AssetDiscovery] ticket band changed', { band });
  }

  protected setSort(sort: SortKey): void {
    this.activeSort.set(sort);
    console.debug('[AssetDiscovery] sort changed', { sort });
  }

  protected onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (!target) {
      console.debug('[AssetDiscovery] sort change ignored: missing target');
      return;
    }

    const next = target.value as SortKey;
    this.setSort(next);
  }
}
