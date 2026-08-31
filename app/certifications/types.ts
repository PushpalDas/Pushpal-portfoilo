export interface CertificationModal {
	active: boolean;
	index: number;
}

/**
 * One certificate document held by a record.
 *
 * A record that carries several — a Coursera specialization and the courses
 * inside it, a pair the title already joins — lists them all on its page.
 */
export interface CertificateDoc {
	/** Path under /static/images/certificates/. */
	src: string;
	/** The course or award as the certificate itself names it. */
	title: string;
	/** 'Professional Certificate', 'Specialization', 'Course', 'Award'. */
	kind?: string;
	/** Issue date as printed. */
	date?: string;
	/**
	 * Verification link printed on the certificate itself. Absent where the
	 * document carries none — nothing is invented to fill the slot.
	 */
	url?: string;
}

export interface CertificationItem {
	title: string;
	location: string;
	services: string;
	year: string;
	src: string;
	color: string;
	url: string;
	categories: string[];
	icon?: string;
	/**
	 * The brief on the record's page: two or three lines written against the
	 * certificate itself. Where it is absent the page composes a line out of
	 * the issuer, year and categories rather than inventing anything.
	 */
	summary?: string;
	/**
	 * Every record has one, and every tile links to /certifications/<slug>.
	 * Required so a new entry cannot be added without a page to land on.
	 */
	slug: string;
	/**
	 * True where `src` is a typographic title card rather than a scanned
	 * record — a recognition with no certificate behind it. The page says so
	 * instead of letting the card read as a document.
	 */
	titleCard?: boolean;
	/**
	 * Set only where a record holds more than one certificate. Where it is
	 * absent the page composes a single plate out of `src`, `title` and `url`
	 * rather than repeating them here.
	 */
	documents?: CertificateDoc[];
}
