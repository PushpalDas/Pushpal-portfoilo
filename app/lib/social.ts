/**
 * Social profiles, defined once so the hero, the About closer, the contact page
 * and the shared footer cannot drift apart again.
 */

// TODO(pushpal): confirm this vanity URL is the live profile. The repo carried
// two spellings — this one and /in/pushpal-das-98485a1b5/ — and LinkedIn answers
// HTTP 999 to unauthenticated fetches, so neither could be verified from here.
export const LINKEDIN_URL = 'https://www.linkedin.com/in/pushpaldas/';

// TODO(pushpal): confirm the handle. The repo carried three spellings —
// x.com/Pushpal_D (hero), twitter.com/pushpaldas (footer) and
// x.com/pushpaldas (contact page). This defaults to the hero’s, and X
// answers 402 to unauthenticated fetches so none could be verified from
// here. One line to change if it is wrong.
export const X_URL = 'https://x.com/Pushpal_D';
