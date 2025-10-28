import { badgeClass, severityClass, streamClass, trendClass } from './dashboard-style.util';

describe('dashboard-style util', () => {
  describe('trendClass', () => {
    it('returns positive class for up trend', () => {
      expect(trendClass('up')).toBe('trend-positive');
    });

    it('returns negative class for down trend', () => {
      expect(trendClass('down')).toBe('trend-negative');
    });

    it('returns neutral class for flat trend', () => {
      expect(trendClass('flat')).toBe('trend-neutral');
    });
  });

  describe('severityClass', () => {
    it('maps severities to palette', () => {
      expect(severityClass('critical')).toBe('alert-critical');
      expect(severityClass('warning')).toBe('alert-warning');
      expect(severityClass('info')).toBe('alert-info');
    });
  });

  describe('streamClass', () => {
    it('returns gradient classes for each stream type', () => {
      expect(streamClass('portfolio')).toBe('stream-portfolio');
      expect(streamClass('compliance')).toBe('stream-compliance');
      expect(streamClass('liquidity')).toBe('stream-liquidity');
      expect(streamClass('support')).toBe('stream-support');
    });
  });

  describe('badgeClass', () => {
    it('returns color tokens for tag variants', () => {
      expect(badgeClass('violet')).toBe('badge-violet');
      expect(badgeClass('emerald')).toBe('badge-emerald');
      expect(badgeClass('amber')).toBe('badge-amber');
    });
  });
}
);
