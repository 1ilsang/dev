export type DetailVisibility = 'idle' | 'open' | 'closed';

export const DETAIL_VISIBILITY_CLASS: Record<DetailVisibility, string> = {
  idle: 'invisible opacity-0 max-h-0',
  open: 'animate-show',
  closed: 'animate-hide',
};

export const toggleDetailVisibility = (
  prev: DetailVisibility,
): DetailVisibility => (prev === 'open' ? 'closed' : 'open');
