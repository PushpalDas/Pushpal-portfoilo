/**
 * ================================================================
 * CASE STUDY DATA — BLANK TEMPLATE
 * ================================================================
 * To use this template:
 *  1. Duplicate this file and rename it, e.g. `my-project-data.ts`
 *  2. Fill in every field below
 *  3. Register the slug in `app/work/[slug]/page.tsx` (see comments there)
 *  4. Add your media files under `public/static/images/project/`
 *  5. Set `reflection: null` to hide that section entirely
 *  6. Set `isConfidential: true` to hide the media grid and replace
 *     metric values with relative terms
 * ================================================================
 */

import type { CaseStudyData } from './case-study-types';

export const TEMPLATE_PROJECT_DATA: CaseStudyData = {
  // ── Identity ────────────────────────────────────────────────
  slug: '',                           // URL slug, e.g. 'xana-rag-platform'
  company: '',                        // e.g. 'Ixana'
  organization: '',                   // e.g. "Founder's Office"
  title: '',                          // e.g. 'XANA — Multifile RAG Platform'
  dateRange: '',                      // e.g. 'Jan 2024 – Present'
  role: '',                           // e.g. 'Product Lead'
  teamSize: '',                       // e.g. '4 people'

  tags: [
    // e.g. 'AI/ML', 'System Design', 'Patent', 'Full-stack'
  ],

  // ── Confidentiality ─────────────────────────────────────────
  isConfidential: false,
  confidentialNote: '',               // Leave empty to use the default note

  // ── Sections ────────────────────────────────────────────────

  /** 2–3 sentences. Problem · Action · Result */
  tldr: '',

  /**
   * Describe the landscape your team was operating in.
   * What gap existed? What constraint made this problem hard?
   */
  context: '',

  /**
   * What did you specifically own?
   * What were 2–3 key decisions you made?
   * What tradeoffs did you navigate?
   */
  roleAndApproach: '',

  /**
   * Set to null to hide the Key Decision card.
   * Otherwise fill in both fields.
   */
  keyDecision: {
    label: 'Key decision',            // Optional — defaults to "Key decision"
    decision: '',                     // e.g. 'We chose to build a custom ingestion pipeline…'
    reasoning: '',                    // e.g. 'Off-the-shelf solutions couldn't handle…'
  },

  /**
   * High-level description of what was built.
   * Focus on what it is and who it serves.
   */
  whatWasBuilt: '',

  /**
   * Media items.
   * - type: 'image' | 'gif' | 'video' | 'demo'
   * - src: path to image, or YouTube/Vimeo URL, or embed URL
   *       Leave empty ("") → placeholder slot renders automatically
   * - fullWidth: true → spans both columns
   * - caption: optional descriptive text shown below
   */
  media: [
    { type: 'image', src: '',  caption: '', fullWidth: false },
    { type: 'image', src: '',  caption: '', fullWidth: false },
    { type: 'video', src: '',  caption: '', fullWidth: true  },
  ],

  /**
   * Metric cards shown in Section 6.
   * value: a string like "2x", "~40%", "14k+", etc.
   * Numeric parts animate on scroll.
   */
  metrics: [
    { value: '',  label: '' },
    { value: '',  label: '' },
    { value: '',  label: '' },
  ],

  /**
   * Narrative context for the metrics.
   * What do the numbers mean for the business / team / customer?
   */
  impactContext: '',

  /**
   * Optional reflection.
   * Set to null to hide the section entirely.
   * Questions to answer: What would you do differently?
   * What surprised you? What did you learn?
   */
  reflection: null,

  /**
   * Links shown in "Go deeper" section.
   * icon options: 'github' | 'file' | 'play' | 'certificate' |
   *               'video' | 'paper' | 'drive' | 'external'
   */
  links: [
    // { icon: 'github',  label: 'Source code',      url: 'https://github.com/...' },
    // { icon: 'paper',   label: 'Technical paper',  url: 'https://...' },
    // { icon: 'video',   label: 'Demo recording',   url: 'https://...' },
    // { icon: 'file',    label: 'Case study PDF',   url: '/...' },
  ],

  // ── Bottom navigation ───────────────────────────────────────
  prevProject: null,  // or: { slug: 'other-slug', title: 'Other Project' }
  nextProject: null,  // or: { slug: 'other-slug', title: 'Other Project' }
};
