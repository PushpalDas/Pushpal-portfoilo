import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import BackNavigation from '../../../components/layouts/back-navigation';
import { components } from '../../../components/mdx';

/**
 * The Finance orchestrator's PM artifacts, served from docs/finance/*.md so
 * the case study's Verify strip can open the PRD, the spec, the user
 * stories, the roadmap, the business case, the memo, the one-pager, the
 * decision log, the trust note, the fund-accounting mapping, the data
 * dictionary and the demo script as pages rather than repository files.
 * Plain markdown (tables via GFM), not MDX: the documents carry braces and
 * angle brackets in prose that MDX would try to run.
 */

const DOCS_DIR = path.join(process.cwd(), 'docs', 'finance');

/** Only the artifacts are public; the phase walkthroughs, the plan and the task list stay in the repository. */
const PUBLIC_DOCS: Record<string, string> = {
	prd: 'Product requirements — Finance orchestrator',
	'engineering-spec': 'Engineering specification',
	'user-stories':
		'User stories — Invoice Watcher and Tie-out desk',
	roadmap: 'Roadmap — Now / Next / Later',
	'business-case': 'Business case — modelled, not measured',
	'leadership-memo': 'Leadership memo',
	'gtm-one-pager': 'Go-to-market one-pager',
	'decision-log': 'Decision log',
	'trust-accuracy-explainability': 'Trust, accuracy and explainability',
	'fund-accounting-mapping': 'Mapping to nonprofit fund accounting',
	'demo-script': 'Ten-minute demo script',
};

export const dynamicParams = false;

export function generateStaticParams() {
	return Object.keys(PUBLIC_DOCS)
		.filter((doc) => fs.existsSync(path.join(DOCS_DIR, `${doc}.md`)))
		.map((doc) => ({ doc }));
}

export async function generateMetadata(props: {
	params: Promise<{ doc: string }>;
}): Promise<Metadata> {
	const { doc } = await props.params;
	const title = PUBLIC_DOCS[doc];
	return {
		title: title ? `${title} · Finance orchestrator` : 'Finance orchestrator',
		description:
			'A PM artifact for the Finance orchestrator case study. Every figure is illustrative, computed from a synthetic ledger.',
		robots: { index: false, follow: true },
	};
}

export default async function FinanceDoc(props: {
	params: Promise<{ doc: string }>;
}) {
	const { doc } = await props.params;
	if (!PUBLIC_DOCS[doc]) notFound();
	const file = path.join(DOCS_DIR, `${doc}.md`);
	if (!fs.existsSync(file)) notFound();
	const source = fs.readFileSync(file, 'utf8');
	const { content } = await compileMDX({
		source,
		components,
		options: {
			mdxOptions: { format: 'md', remarkPlugins: [remarkGfm] },
		},
	});
	return (
		<>
			<section>
				<BackNavigation />
				<p className='mt-4 text-xs uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400'>
					Finance orchestrator · PM artifact · illustrative, synthetic ledger
				</p>
			</section>
			<article className='finance-doc md:max-w-5xl'>{content}</article>
		</>
	);
}
