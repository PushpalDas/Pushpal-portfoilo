// ============================================================
//  Case Study — Type Definitions
//  Used by every project page under /work/[slug]
// ============================================================

export type MediaType = 'image' | 'video' | 'gif' | 'demo';

export interface MediaItem {
  type: MediaType;
  src: string;          // empty string → ignored on live page
  caption?: string;
  fullWidth?: boolean;  // true → spans both columns in the grid
}

export interface MetricItem {
  value: string;   // e.g. "2x", "~40%"
  label: string;   // e.g. "Speed improvement"
}

export interface LinkItem {
  icon: 'github' | 'file' | 'play' | 'certificate' | 'video' | 'paper' | 'drive' | 'external';
  label: string;
  url: string;
}

export interface ProjectNav {
  slug: string;
  title: string;
}

export interface CaseStudyData {
  slug: string;
  company: string;
  organization: string;
  title: string;
  dateRange: string;
  role: string;
  teamSize: string;
  tags: string[];

  /**
   * Set to true for NDA/confidential projects.
   * – Section 5 media grid is replaced with a "Confidential" card.
   * – Metric values should use relative terms (handled by you in data).
   * – Proprietary links are hidden from Section 8.
   */
  isConfidential?: boolean;
  confidentialNote?: string;

  tldr: string;
  roleAndApproach: string;

  /** List of 2–3 key decisions, rendered as bullets */
  keyDecisions: string[];

  whatWasBuilt: string;

  /**
   * Supports 4 types: image | video | gif | demo
   */
  media: MediaItem[];

  metrics: MetricItem[];
  impactContext: string;

  /** Set to null to hide the Reflection section entirely */
  reflection: string | null;

  links: LinkItem[];

  prevProject: ProjectNav | null;
  nextProject: ProjectNav | null;
}
