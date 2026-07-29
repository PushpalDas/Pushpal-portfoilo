'use client';

import { useCallback, useEffect, useState } from 'react';
import './admin.css';

/* ─── Types ───────────────────────────────────────────────── */

interface ItemData {
	title: string;
	location: string;
	services: string;
	year: string;
	src: string;
	color: string;
	url: string;
	slug?: string;
	categories: string[];
}

interface MediaRow {
	type: 'image' | 'video' | 'gif' | 'demo';
	src: string;
	caption: string;
	fullWidth: boolean;
}

interface MetricRow {
	value: string;
	label: string;
}

interface LinkRow {
	icon: string;
	label: string;
	url: string;
}

interface CaseStudyForm {
	slug: string;
	company: string;
	organization: string;
	title: string;
	dateRange: string;
	role: string;
	teamSize: string;
	tags: string; // comma-separated
	isConfidential: boolean;
	confidentialNote: string;
	tldr: string;
	context: string;
	roleAndApproach: string;
	showKeyDecision: boolean;
	keyDecisionLabel: string;
	keyDecision: string;
	keyDecisionReasoning: string;
	whatWasBuilt: string;
	media: MediaRow[];
	metrics: MetricRow[];
	impactContext: string;
	showReflection: boolean;
	reflection: string;
	links: LinkRow[];
	prevSlug: string;
	prevTitle: string;
	nextSlug: string;
	nextTitle: string;
}

type TabKey = 'works' | 'certifications';
type ModalTab = 'basic' | 'casestudy';

interface Toast {
	message: string;
	type: 'success' | 'error';
}

const emptyItem: ItemData = {
	title: '',
	location: '',
	services: '',
	year: '',
	src: '',
	color: '#dbeafe',
	url: '',
	slug: '',
	categories: [],
};

const emptyCaseStudy: CaseStudyForm = {
	slug: '',
	company: '',
	organization: '',
	title: '',
	dateRange: '',
	role: '',
	teamSize: '',
	tags: '',
	isConfidential: false,
	confidentialNote: '',
	tldr: '',
	context: '',
	roleAndApproach: '',
	showKeyDecision: true,
	keyDecisionLabel: 'Key decision',
	keyDecision: '',
	keyDecisionReasoning: '',
	whatWasBuilt: '',
	media: [
		{ type: 'image', src: '', caption: '', fullWidth: false },
		{ type: 'image', src: '', caption: '', fullWidth: false },
		{ type: 'video', src: '', caption: '', fullWidth: true },
	],
	metrics: [
		{ value: '', label: '' },
		{ value: '', label: '' },
		{ value: '', label: '' },
	],
	impactContext: '',
	showReflection: false,
	reflection: '',
	links: [],
	prevSlug: '',
	prevTitle: '',
	nextSlug: '',
	nextTitle: '',
};

const LINK_ICON_OPTIONS = [
	'github',
	'file',
	'play',
	'certificate',
	'video',
	'paper',
	'drive',
	'external',
];

/* ─── Icons ───────────────────────────────────────────────── */

function PlusIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
		>
			<path d='M12 5v14M5 12h14' />
		</svg>
	);
}

function PencilIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
		>
			<path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
			<path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
		</svg>
	);
}

function TrashIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
		>
			<path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
		>
			<path d='M18 6L6 18M6 6l12 12' />
		</svg>
	);
}

function AlertIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
		>
			<path d='M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' />
			<line x1='12' y1='9' x2='12' y2='13' />
			<line x1='12' y1='17' x2='12.01' y2='17' />
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			width='16'
			height='16'
		>
			<polyline points='20 6 9 17 4 12' />
		</svg>
	);
}

function BoxIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
		>
			<path d='M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z' />
		</svg>
	);
}

function GripIcon() {
	return (
		<svg viewBox='0 0 24 24' fill='currentColor' width='16' height='16'>
			<circle cx='9' cy='6' r='1.5' />
			<circle cx='15' cy='6' r='1.5' />
			<circle cx='9' cy='12' r='1.5' />
			<circle cx='15' cy='12' r='1.5' />
			<circle cx='9' cy='18' r='1.5' />
			<circle cx='15' cy='18' r='1.5' />
		</svg>
	);
}

function LockIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			width='20'
			height='20'
		>
			<rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
			<path d='M7 11V7a5 5 0 0110 0v4' />
		</svg>
	);
}

function MoveTopIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2.5}
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='4' y1='3' x2='20' y2='3' />
			<polyline points='18 10 12 4 6 10' />
			<polyline points='18 18 12 12 6 18' />
		</svg>
	);
}

function ChevronUpIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2.5}
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polyline points='18 15 12 9 6 15' />
		</svg>
	);
}

function ChevronDownIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2.5}
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polyline points='6 9 12 15 18 9' />
		</svg>
	);
}

function ExternalLinkIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			width='14'
			height='14'
		>
			<path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6' />
			<polyline points='15 3 21 3 21 9' />
			<line x1='10' y1='14' x2='21' y2='3' />
		</svg>
	);
}

function SparkleIcon() {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			width='15'
			height='15'
		>
			<path d='M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z' />
			<path d='M19 15l.7 1.8L21.5 17.5l-1.8.7L19 20l-.7-1.8L16.5 17.5l1.8-.7L19 15z' />
		</svg>
	);
}

/* ─── Slug generator ─────────────────────────────────────── */

function titleToSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[|–—]/g, '-')
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 60);
}

/* ─── Main Component ────────────────────────────────────── */

export default function AdminPage() {
	const [authenticated, setAuthenticated] = useState(false);
	const [password, setPassword] = useState('');
	const [loginLoading, setLoginLoading] = useState(false);
	const [loginError, setLoginError] = useState('');

	const [activeTab, setActiveTab] = useState<TabKey>('works');
	const [workItems, setWorkItems] = useState<ItemData[]>([]);
	const [certItems, setCertItems] = useState<ItemData[]>([]);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const [workCategories, setWorkCategories] = useState<
		{ key: string; label: string }[]
	>([]);
	const [certCategories, setCertCategories] = useState<
		{ key: string; label: string }[]
	>([]);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalTab, setModalTab] = useState<ModalTab>('basic');
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [formData, setFormData] = useState<ItemData>(emptyItem);
	const [csForm, setCsForm] = useState<CaseStudyForm>(emptyCaseStudy);
	const [csSaving, setCsSaving] = useState(false);
	const [csLoaded, setCsLoaded] = useState(false);

	const [aiOpen, setAiOpen] = useState(false);
	const [aiFilling, setAiFilling] = useState(false);
	const [aiNotes, setAiNotes] = useState('');
	const [aiOverwrite, setAiOverwrite] = useState(false);
	const [aiFileName, setAiFileName] = useState('');

	const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
	const [toast, setToast] = useState<Toast | null>(null);
	const [uploading, setUploading] = useState(false);

	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	const [mediaDragIndex, setMediaDragIndex] = useState<number | null>(null);
	const [mediaDragOverIndex, setMediaDragOverIndex] = useState<number | null>(
		null,
	);

	const storedPassword = password;

	/* ─── Auth ──────────────────────────────────────────── */

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoginLoading(true);
		setLoginError('');
		try {
			const res = await fetch('/api/admin/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password }),
			});
			if (res.ok) {
				setAuthenticated(true);
			} else {
				const data = await res.json();
				setLoginError(data.error || 'Invalid password');
			}
		} catch {
			setLoginError('Connection failed');
		} finally {
			setLoginLoading(false);
		}
	};

	/* ─── Toast ─────────────────────────────────────────── */

	const showToast = useCallback(
		(message: string, type: 'success' | 'error') => {
			setToast({ message, type });
			setTimeout(() => setToast(null), 3000);
		},
		[],
	);

	/* ─── Fetch data ────────────────────────────────────── */

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [worksRes, certsRes] = await Promise.all([
				fetch('/api/admin/works', {
					headers: { 'x-admin-password': storedPassword },
				}),
				fetch('/api/admin/certifications', {
					headers: { 'x-admin-password': storedPassword },
				}),
			]);
			if (worksRes.ok) {
				const data = await worksRes.json();
				setWorkItems(data.items);
				setWorkCategories(
					data.filters.filter((f: { key: string }) => f.key !== 'all'),
				);
			}
			if (certsRes.ok) {
				const data = await certsRes.json();
				setCertItems(data.items);
				setCertCategories(
					data.filters.filter((f: { key: string }) => f.key !== 'all'),
				);
			}
		} catch {
			showToast('Failed to load data', 'error');
		} finally {
			setLoading(false);
		}
	}, [storedPassword, showToast]);

	useEffect(() => {
		if (authenticated) fetchData();
	}, [authenticated, fetchData]);

	/* ─── Image upload ──────────────────────────────────── */

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		const file = files[0];
		setUploading(true);
		showToast('Processing image...', 'success');
		const uploadData = new FormData();
		uploadData.append('file', file);
		try {
			const res = await fetch('/api/admin/upload', {
				method: 'POST',
				headers: { 'x-admin-password': storedPassword },
				body: uploadData,
			});
			if (res.ok) {
				const data = await res.json();
				if (data.success && data.filename) {
					handleFormChange('src', data.filename);
					showToast('Image uploaded!', 'success');
				} else {
					showToast(data.error || 'Upload failed', 'error');
				}
			} else {
				showToast('Upload failed', 'error');
			}
		} catch {
			showToast('Connection failed during upload', 'error');
		} finally {
			setUploading(false);
			e.target.value = '';
		}
	};

	const handleMediaImageUpload = async (
		i: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		const file = files[0];
		setUploading(true);
		showToast('Processing image...', 'success');
		const uploadData = new FormData();
		uploadData.append('file', file);
		try {
			const res = await fetch('/api/admin/upload', {
				method: 'POST',
				headers: { 'x-admin-password': storedPassword },
				body: uploadData,
			});
			if (res.ok) {
				const data = await res.json();
				if (data.success && data.filename) {
					updateMedia(i, 'src', data.filename);
					showToast('Image uploaded successfully!', 'success');
				} else {
					showToast(data.error || 'Upload failed', 'error');
				}
			} else {
				showToast('Upload failed', 'error');
			}
		} catch {
			showToast('Connection failed during upload', 'error');
		} finally {
			setUploading(false);
			e.target.value = '';
		}
	};

	/* ─── Current context ───────────────────────────────── */

	const currentItems = activeTab === 'works' ? workItems : certItems;
	const setCurrentItems = activeTab === 'works' ? setWorkItems : setCertItems;
	const apiPath =
		activeTab === 'works' ? '/api/admin/works' : '/api/admin/certifications';

	/* ─── Save items list ───────────────────────────────── */

	const saveItems = async (items: ItemData[]) => {
		setSaving(true);
		try {
			const res = await fetch(apiPath, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'x-admin-password': storedPassword,
				},
				body: JSON.stringify({ items }),
			});
			if (res.ok) {
				showToast(
					`${activeTab === 'works' ? 'Work' : 'Certification'} items saved!`,
					'success',
				);
				return true;
			}
			showToast('Failed to save changes', 'error');
			return false;
		} catch {
			showToast('Failed to save changes', 'error');
			return false;
		} finally {
			setSaving(false);
		}
	};

	/* ─── Basic form helpers ────────────────────────────── */

	const handleFormChange = (field: keyof ItemData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Auto-generate slug when title changes (if slug is empty or was auto-generated)
		if (field === 'title' && activeTab === 'works') {
			const auto = titleToSlug(value);
			setFormData((prev) => ({ ...prev, title: value, slug: auto }));
			setCsForm((prev) => ({ ...prev, slug: auto, title: value }));
		}
	};

	const handleCategoryToggle = (categoryKey: string) => {
		setFormData((prev) => {
			const hasCat = prev.categories.includes(categoryKey);
			return {
				...prev,
				categories: hasCat
					? prev.categories.filter((c) => c !== categoryKey)
					: [...prev.categories, categoryKey],
			};
		});
	};

	/* ─── Case study form helpers ───────────────────────── */

	const csChange = <K extends keyof CaseStudyForm>(
		field: K,
		value: CaseStudyForm[K],
	) => {
		setCsForm((prev) => ({ ...prev, [field]: value }));
	};

	// Media rows
	const addMediaRow = () =>
		setCsForm((prev) => ({
			...prev,
			media: [
				...prev.media,
				{ type: 'image', src: '', caption: '', fullWidth: false },
			],
		}));

	const updateMedia = (
		i: number,
		field: keyof MediaRow,
		value: string | boolean,
	) => {
		setCsForm((prev) => {
			const updated = [...prev.media];
			updated[i] = { ...updated[i], [field]: value };
			return { ...prev, media: updated };
		});
	};

	const removeMedia = (i: number) =>
		setCsForm((prev) => ({
			...prev,
			media: prev.media.filter((_, idx) => idx !== i),
		}));

	// Metric rows
	const addMetricRow = () =>
		setCsForm((prev) => ({
			...prev,
			metrics: [...prev.metrics, { value: '', label: '' }],
		}));

	const updateMetric = (i: number, field: 'value' | 'label', val: string) => {
		setCsForm((prev) => {
			const updated = [...prev.metrics];
			updated[i] = { ...updated[i], [field]: val };
			return { ...prev, metrics: updated };
		});
	};

	const removeMetric = (i: number) =>
		setCsForm((prev) => ({
			...prev,
			metrics: prev.metrics.filter((_, idx) => idx !== i),
		}));

	// Link rows
	const addLinkRow = () =>
		setCsForm((prev) => ({
			...prev,
			links: [...prev.links, { icon: 'external', label: '', url: '' }],
		}));

	const updateLink = (i: number, field: keyof LinkRow, val: string) => {
		setCsForm((prev) => {
			const updated = [...prev.links];
			updated[i] = { ...updated[i], [field]: val };
			return { ...prev, links: updated };
		});
	};

	const removeLink = (i: number) =>
		setCsForm((prev) => ({
			...prev,
			links: prev.links.filter((_, idx) => idx !== i),
		}));

	/* ─── AI fill from document ─────────────────────────── */

	const handleAiFill = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = ''; // allow re-picking the same file
		if (!file) return;

		setAiFileName(file.name);
		setAiFilling(true);
		try {
			const body = new FormData();
			body.append('file', file);
			if (aiNotes.trim()) body.append('notes', aiNotes);

			const res = await fetch('/api/admin/ai-fill', {
				method: 'POST',
				headers: { 'x-admin-password': storedPassword },
				body,
			});
			const json = await res.json();

			if (!res.ok) {
				showToast(json.error || 'AI fill failed', 'error');
				return;
			}

			const ai = json.data ?? {};
			const next = { ...csForm };
			let filled = 0;

			// Only write a field when the model returned something and the
			// field is empty — unless the author asked to overwrite.
			const setText = (key: keyof CaseStudyForm, incoming: unknown) => {
				const value = typeof incoming === 'string' ? incoming.trim() : '';
				if (!value) return;
				if (!aiOverwrite && String(csForm[key] ?? '').trim()) return;
				(next[key] as string) = value;
				filled++;
			};

			setText('company', ai.company);
			setText('organization', ai.organization);
			setText('title', ai.title);
			setText('dateRange', ai.dateRange);
			setText('role', ai.role);
			setText('teamSize', ai.teamSize);
			setText('tldr', ai.tldr);
			setText('context', ai.context);
			setText('roleAndApproach', ai.roleAndApproach);
			setText('whatWasBuilt', ai.whatWasBuilt);
			setText('impactContext', ai.impactContext);
			setText('keyDecision', ai.keyDecision);
			setText('keyDecisionReasoning', ai.keyDecisionReasoning);
			setText('reflection', ai.reflection);

			if (Array.isArray(ai.tags) && ai.tags.length) {
				setText('tags', ai.tags.join(', '));
			}

			// Reveal the optional sections the model actually produced content for.
			if (next.keyDecision.trim()) next.showKeyDecision = true;
			if (next.reflection.trim()) next.showReflection = true;

			const metrics: MetricRow[] = Array.isArray(ai.metrics)
				? ai.metrics.filter(
						(m: MetricRow) => m?.value?.trim() || m?.label?.trim(),
					)
				: [];
			const metricsAreBlank = csForm.metrics.every(
				(m) => !m.value.trim() && !m.label.trim(),
			);
			if (metrics.length && (aiOverwrite || metricsAreBlank)) {
				next.metrics = metrics.map((m) => ({
					value: m.value ?? '',
					label: m.label ?? '',
				}));
				filled++;
			}

			const links: LinkRow[] = Array.isArray(ai.links)
				? ai.links.filter((l: LinkRow) => l?.url?.trim())
				: [];
			if (links.length && (aiOverwrite || csForm.links.length === 0)) {
				next.links = links.map((l) => ({
					icon: LINK_ICON_OPTIONS.includes(l.icon) ? l.icon : 'external',
					label: l.label || 'Link',
					url: l.url,
				}));
				filled++;
			}

			setCsForm(next);

			if (filled === 0) {
				showToast(
					aiOverwrite
						? 'Nothing found in that document to fill'
						: 'All fields already filled — tick "Overwrite" to replace them',
					'error',
				);
			} else {
				showToast(
					`AI filled ${filled} section${filled === 1 ? '' : 's'} — review before saving`,
					'success',
				);
			}
		} catch {
			showToast('AI fill failed', 'error');
		} finally {
			setAiFilling(false);
		}
	};

	/* ─── Load case study for editing ──────────────────── */

	const loadCaseStudy = useCallback(
		async (slug: string) => {
			if (!slug) {
				setCsForm(emptyCaseStudy);
				setCsLoaded(true);
				return;
			}
			try {
				const res = await fetch(
					`/api/admin/case-study?slug=${encodeURIComponent(slug)}`,
					{
						headers: { 'x-admin-password': storedPassword },
					},
				);
				if (res.ok) {
					const { data } = await res.json();
					if (data) {
						// Map stored data back to form state
						setCsForm({
							slug: data.slug ?? slug,
							company: data.company ?? '',
							organization: data.organization ?? '',
							title: data.title ?? '',
							dateRange: data.dateRange ?? '',
							role: data.role ?? '',
							teamSize: data.teamSize ?? '',
							tags: Array.isArray(data.tags)
								? data.tags.join(', ')
								: (data.tags ?? ''),
							isConfidential: data.isConfidential ?? false,
							confidentialNote: data.confidentialNote ?? '',
							tldr: data.tldr ?? '',
							context: data.context ?? '',
							roleAndApproach: data.roleAndApproach ?? '',
							showKeyDecision:
								data.keyDecision !== null && data.keyDecision !== undefined,
							keyDecisionLabel: data.keyDecision?.label ?? 'Key decision',
							keyDecision: data.keyDecision?.decision ?? '',
							keyDecisionReasoning: data.keyDecision?.reasoning ?? '',
							whatWasBuilt: data.whatWasBuilt ?? '',
							media: data.media?.length > 0 ? data.media : emptyCaseStudy.media,
							metrics:
								data.metrics?.length > 0
									? data.metrics
									: emptyCaseStudy.metrics,
							impactContext: data.impactContext ?? '',
							showReflection:
								data.reflection !== null && data.reflection !== undefined,
							reflection: data.reflection ?? '',
							links: data.links ?? [],
							prevSlug: data.prevProject?.slug ?? '',
							prevTitle: data.prevProject?.title ?? '',
							nextSlug: data.nextProject?.slug ?? '',
							nextTitle: data.nextProject?.title ?? '',
						});
					} else {
						setCsForm({ ...emptyCaseStudy, slug });
					}
				}
			} catch {
				setCsForm({ ...emptyCaseStudy, slug });
			}
			setCsLoaded(true);
		},
		[storedPassword],
	);

	/* ─── Open modals ───────────────────────────────────── */

	const openAddModal = () => {
		setEditIndex(null);
		setFormData({ ...emptyItem, categories: [] });
		setCsForm(emptyCaseStudy);
		setCsLoaded(false);
		setModalTab('basic');
		setModalOpen(true);
	};

	const openEditModal = async (index: number) => {
		const item = currentItems[index];
		setEditIndex(index);
		setFormData({ ...item });
		setCsForm(emptyCaseStudy);
		setCsLoaded(false);
		setModalTab('basic');
		setModalOpen(true);
		if (activeTab === 'works') {
			await loadCaseStudy(item.slug ?? titleToSlug(item.title));
		}
	};

	/* ─── Save basic item ───────────────────────────────── */

	const handleSaveItem = async () => {
		const slug =
			activeTab === 'works'
				? formData.slug || titleToSlug(formData.title)
				: undefined;

		const item: ItemData = { ...formData, slug };
		let newItems: ItemData[];
		if (editIndex !== null) {
			newItems = [...currentItems];
			newItems[editIndex] = item;
		} else {
			newItems = [...currentItems, item];
		}
		const saved = await saveItems(newItems);
		if (saved) {
			setCurrentItems(newItems);
			setModalOpen(false);
		}
	};

	/* ─── Save case study ───────────────────────────────── */

	const handleSaveCaseStudy = async () => {
		const slug = csForm.slug || titleToSlug(formData.title);
		if (!slug) {
			showToast('Please set a slug or title first', 'error');
			return;
		}

		setCsSaving(true);
		try {
			// Build the CaseStudyData object
			const payload = {
				slug,
				company: csForm.company,
				organization: csForm.organization,
				title: csForm.title || formData.title,
				dateRange: csForm.dateRange,
				role: csForm.role,
				teamSize: csForm.teamSize,
				tags: csForm.tags
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean),
				isConfidential: csForm.isConfidential,
				confidentialNote: csForm.confidentialNote,
				tldr: csForm.tldr,
				context: csForm.context,
				roleAndApproach: csForm.roleAndApproach,
				keyDecision: csForm.showKeyDecision
					? {
							label: csForm.keyDecisionLabel,
							decision: csForm.keyDecision,
							reasoning: csForm.keyDecisionReasoning,
						}
					: null,
				whatWasBuilt: csForm.whatWasBuilt,
				media: csForm.media,
				metrics: csForm.metrics,
				impactContext: csForm.impactContext,
				reflection: csForm.showReflection ? csForm.reflection : null,
				links: csForm.links,
				prevProject: csForm.prevSlug
					? { slug: csForm.prevSlug, title: csForm.prevTitle }
					: null,
				nextProject: csForm.nextSlug
					? { slug: csForm.nextSlug, title: csForm.nextTitle }
					: null,
			};

			const res = await fetch('/api/admin/case-study', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'x-admin-password': storedPassword,
				},
				body: JSON.stringify(payload),
			});

			if (res.ok) {
				// Also make sure the work item has the slug saved
				const updatedItems = [...currentItems];
				if (editIndex !== null) {
					updatedItems[editIndex] = { ...updatedItems[editIndex], slug };
					await saveItems(updatedItems);
					setCurrentItems(updatedItems);
				}
				showToast(
					`Case study saved! Card will now link to /work/${slug}`,
					'success',
				);
			} else {
				showToast('Failed to save case study', 'error');
			}
		} catch {
			showToast('Failed to save case study', 'error');
		} finally {
			setCsSaving(false);
		}
	};

	/* ─── Drag & Drop / Reorder ─────────────────────────── */

	const handleDragStart = (index: number) => setDragIndex(index);
	const handleDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		if (dragIndex === null || dragIndex === index) return;
		setDragOverIndex(index);
	};
	const handleDrop = async (index: number) => {
		if (dragIndex === null || dragIndex === index) {
			setDragIndex(null);
			setDragOverIndex(null);
			return;
		}
		const newItems = [...currentItems];
		const [movedItem] = newItems.splice(dragIndex, 1);
		newItems.splice(index, 0, movedItem);
		setCurrentItems(newItems);
		setDragIndex(null);
		setDragOverIndex(null);
		await saveItems(newItems);
	};
	const handleDragEnd = () => {
		setDragIndex(null);
		setDragOverIndex(null);
	};

	const handleMediaDragStart = (index: number) => setMediaDragIndex(index);
	const handleMediaDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		if (mediaDragIndex === null || mediaDragIndex === index) return;
		setMediaDragOverIndex(index);
	};
	const handleMediaDrop = (index: number) => {
		if (mediaDragIndex === null || mediaDragIndex === index) {
			setMediaDragIndex(null);
			setMediaDragOverIndex(null);
			return;
		}
		const newMedia = [...csForm.media];
		const [movedMedia] = newMedia.splice(mediaDragIndex, 1);
		newMedia.splice(index, 0, movedMedia);
		setCsForm((prev) => ({ ...prev, media: newMedia }));
		setMediaDragIndex(null);
		setMediaDragOverIndex(null);
	};
	const handleMediaDragEnd = () => {
		setMediaDragIndex(null);
		setMediaDragOverIndex(null);
	};

	const moveItem = async (fromIndex: number, toIndex: number) => {
		if (toIndex < 0 || toIndex >= currentItems.length) return;
		const newItems = [...currentItems];
		const [movedItem] = newItems.splice(fromIndex, 1);
		newItems.splice(toIndex, 0, movedItem);
		setCurrentItems(newItems);
		await saveItems(newItems);
	};

	const moveToTopOfGroup = async (
		globalIndex: number,
		groupTopGlobalIndex: number,
	) => {
		if (globalIndex === groupTopGlobalIndex) return;
		const newItems = [...currentItems];
		const [movedItem] = newItems.splice(globalIndex, 1);
		newItems.splice(groupTopGlobalIndex, 0, movedItem);
		setCurrentItems(newItems);
		await saveItems(newItems);
	};

	/* ─── Group items ───────────────────────────────────── */

	const CERT_GROUPS = ['management', 'skills', 'achievements'];
	const WORK_GROUPS = ['products', 'core'];
	const categoryGroups =
		activeTab === 'certifications' ? CERT_GROUPS : WORK_GROUPS;

	const groupedItems = (() => {
		const groups: {
			label: string;
			key: string;
			items: { item: ItemData; globalIndex: number }[];
		}[] = [];
		const seen = new Set<number>();
		for (const catKey of categoryGroups) {
			const groupItems: { item: ItemData; globalIndex: number }[] = [];
			currentItems.forEach((item, i) => {
				if (
					!seen.has(i) &&
					item.categories.some((c) => c.toLowerCase() === catKey)
				) {
					groupItems.push({ item, globalIndex: i });
					seen.add(i);
				}
			});
			if (groupItems.length > 0) {
				groups.push({
					label: catKey.charAt(0).toUpperCase() + catKey.slice(1),
					key: catKey,
					items: groupItems,
				});
			}
		}
		const uncatItems: { item: ItemData; globalIndex: number }[] = [];
		currentItems.forEach((item, i) => {
			if (!seen.has(i)) {
				uncatItems.push({ item, globalIndex: i });
				seen.add(i);
			}
		});
		if (uncatItems.length > 0)
			groups.push({ label: 'Other', key: 'other', items: uncatItems });
		return groups;
	})();

	/* ─── Delete ────────────────────────────────────────── */

	const handleDelete = async () => {
		if (deleteIndex === null) return;
		const newItems = currentItems.filter((_, i) => i !== deleteIndex);
		const saved = await saveItems(newItems);
		if (saved) {
			setCurrentItems(newItems);
			setDeleteIndex(null);
		}
	};

	/* ─── LOGIN SCREEN ──────────────────────────────────── */

	if (!authenticated) {
		return (
			<div className='admin-login'>
				<form className='admin-login-card' onSubmit={handleLogin}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.75rem',
							marginBottom: '0.5rem',
						}}
					>
						<div
							style={{
								width: '2.5rem',
								height: '2.5rem',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								background: 'rgba(59,130,246,0.15)',
								borderRadius: '0.75rem',
							}}
						>
							<LockIcon />
						</div>
						<h1>Admin Panel</h1>
					</div>
					<p>Enter your admin password to manage content</p>
					<div className='admin-input-group'>
						<label htmlFor='admin-password'>Password</label>
						<input
							id='admin-password'
							type='password'
							className='admin-input'
							placeholder='Enter admin password...'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type='submit'
						className='admin-btn-primary'
						disabled={loginLoading || !password}
					>
						{loginLoading ? <span className='admin-spinner' /> : 'Sign In'}
					</button>
					{loginError && <p className='admin-error'>{loginError}</p>}
				</form>
			</div>
		);
	}

	/* ─── DASHBOARD ─────────────────────────────────────── */

	return (
		<div className='admin-dashboard'>
			<div className='admin-container'>
				{/* Header */}
				<div className='admin-header'>
					<h1>Content Manager</h1>
					<button
						type='button'
						className='admin-btn-logout'
						onClick={() => {
							setAuthenticated(false);
							setPassword('');
						}}
					>
						Sign Out
					</button>
				</div>

				{/* Tabs */}
				<div className='admin-tabs'>
					<button
						type='button'
						className={`admin-tab ${activeTab === 'works' ? 'active' : ''}`}
						onClick={() => setActiveTab('works')}
					>
						Works ({workItems.length})
					</button>
					<button
						type='button'
						className={`admin-tab ${activeTab === 'certifications' ? 'active' : ''}`}
						onClick={() => setActiveTab('certifications')}
					>
						Certifications ({certItems.length})
					</button>
				</div>

				{/* Actions */}
				<div className='admin-actions'>
					<span className='admin-actions-info'>
						{currentItems.length} item{currentItems.length !== 1 ? 's' : ''}
					</span>
					<button
						type='button'
						className='admin-btn-add'
						onClick={openAddModal}
					>
						<PlusIcon /> Add {activeTab === 'works' ? 'Work' : 'Certification'}
					</button>
				</div>

				{/* Items list */}
				{loading ? (
					<div className='admin-loading'>
						<span className='admin-spinner' />
						<span>Loading...</span>
					</div>
				) : currentItems.length === 0 ? (
					<div className='admin-empty'>
						<BoxIcon />
						<p>No items yet. Click &quot;Add&quot; to get started.</p>
					</div>
				) : (
					<div className='admin-items-list'>
						{groupedItems.map((group) => (
							<div key={group.key} className='admin-category-group'>
								<div className='admin-category-group-header'>
									<span className='admin-category-group-label'>
										{group.label}
									</span>
									<span className='admin-category-group-count'>
										{group.items.length} item
										{group.items.length !== 1 ? 's' : ''}
									</span>
								</div>
								{group.items.map(({ item, globalIndex }, posInGroup) => (
									<div
										key={`${item.title}-${globalIndex}`}
										className={`admin-item-card${dragIndex === globalIndex ? ' dragging' : ''}${dragOverIndex === globalIndex ? ' drag-over' : ''}`}
										draggable
										onDragStart={() => handleDragStart(globalIndex)}
										onDragOver={(e) => handleDragOver(e, globalIndex)}
										onDrop={() => handleDrop(globalIndex)}
										onDragEnd={handleDragEnd}
									>
										<div className='admin-drag-handle' title='Drag to reorder'>
											<GripIcon />
										</div>
										<div
											className='admin-item-color'
											style={{ backgroundColor: item.color }}
										>
											{item.title.charAt(0).toUpperCase()}
										</div>
										<div className='admin-item-info'>
											<div className='admin-item-title'>{item.title}</div>
											<div className='admin-item-meta'>
												<span>{item.services}</span>
												<span>•</span>
												<span>{item.year}</span>
												{item.slug && (
													<>
														<span>•</span>
														<span
															style={{ color: '#4a7aff', fontSize: '12px' }}
														>
															/{item.slug}
														</span>
													</>
												)}
											</div>
											<div className='admin-item-categories'>
												{item.categories.map((cat) => (
													<span key={cat} className='admin-category-tag'>
														{cat}
													</span>
												))}
											</div>
										</div>
										<div className='admin-item-actions'>
											<div className='admin-reorder-btns'>
												<button
													type='button'
													className='admin-btn-icon reorder'
													onClick={() =>
														moveToTopOfGroup(
															globalIndex,
															group.items[0].globalIndex,
														)
													}
													title='Move to top'
													disabled={posInGroup === 0 || saving}
												>
													<MoveTopIcon />
												</button>
												<button
													type='button'
													className='admin-btn-icon reorder'
													onClick={() => moveItem(globalIndex, globalIndex - 1)}
													title='Move up'
													disabled={posInGroup === 0 || saving}
												>
													<ChevronUpIcon />
												</button>
												<button
													type='button'
													className='admin-btn-icon reorder'
													onClick={() => moveItem(globalIndex, globalIndex + 1)}
													title='Move down'
													disabled={
														posInGroup === group.items.length - 1 || saving
													}
												>
													<ChevronDownIcon />
												</button>
											</div>
											<button
												type='button'
												className='admin-btn-icon'
												onClick={() => openEditModal(globalIndex)}
												title='Edit'
											>
												<PencilIcon />
											</button>
											<button
												type='button'
												className='admin-btn-icon delete'
												onClick={() => setDeleteIndex(globalIndex)}
												title='Delete'
											>
												<TrashIcon />
											</button>
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				)}
			</div>

			{/* ─── Add/Edit Modal ─────────────────────────────── */}
			{modalOpen && (
				<div
					className='admin-modal-overlay'
					onClick={(e) => {
						if (e.target === e.currentTarget) setModalOpen(false);
					}}
				>
					<div
						className='admin-modal admin-modal--wide'
						data-lenis-prevent='true'
					>
						<div className='admin-modal-header'>
							<h2>{editIndex !== null ? 'Edit Item' : 'Add New Item'}</h2>
							<button
								type='button'
								className='admin-btn-close'
								onClick={() => setModalOpen(false)}
							>
								<CloseIcon />
							</button>
						</div>

						{/* Modal tabs (only for works) */}
						{activeTab === 'works' && (
							<div className='admin-modal-tabs'>
								<button
									type='button'
									className={`admin-modal-tab ${modalTab === 'basic' ? 'active' : ''}`}
									onClick={() => setModalTab('basic')}
								>
									Basic Info
								</button>
								<button
									type='button'
									className={`admin-modal-tab ${modalTab === 'casestudy' ? 'active' : ''}`}
									onClick={() => setModalTab('casestudy')}
								>
									📄 Case Study
									{(formData.slug || csForm.slug) && (
										<span className='admin-modal-tab-badge'>●</span>
									)}
								</button>
							</div>
						)}

						<div className='admin-modal-body'>
							{/* ── BASIC TAB ──────────────────────────────── */}
							{modalTab === 'basic' && (
								<>
									{formData.src && (
										<div className='admin-modal-image-preview'>
											{uploading ? (
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														height: '180px',
														background: 'rgba(255,255,255,0.02)',
														borderRadius: '0.75rem',
														border: '1px dashed rgba(255,255,255,0.08)',
													}}
												>
													<span className='admin-spinner' />
												</div>
											) : (
												/* eslint-disable-next-line @next/next/no-img-element */
												<img
													key={formData.src}
													src={`/static/images/project/${formData.src}?t=${Date.now()}`}
													alt='Preview'
													style={{ display: 'block' }}
													onError={(e) => {
														(e.target as HTMLImageElement).style.display =
															'none';
													}}
												/>
											)}
										</div>
									)}

									<div className='admin-form-group'>
										<label htmlFor='form-title'>Title</label>
										<textarea
											id='form-title'
											className='admin-textarea'
											placeholder='Item title...'
											value={formData.title}
											onChange={(e) =>
												handleFormChange('title', e.target.value)
											}
										/>
									</div>

									<div className='admin-form-row'>
										<div className='admin-form-group'>
											<label htmlFor='form-location'>Location</label>
											<input
												id='form-location'
												type='text'
												className='admin-input'
												placeholder='Location...'
												value={formData.location}
												onChange={(e) =>
													handleFormChange('location', e.target.value)
												}
											/>
										</div>
										<div className='admin-form-group'>
											<label htmlFor='form-year'>Year</label>
											<input
												id='form-year'
												type='text'
												className='admin-input'
												placeholder='e.g. 2024-2025'
												value={formData.year}
												onChange={(e) =>
													handleFormChange('year', e.target.value)
												}
											/>
										</div>
									</div>

									<div className='admin-form-group'>
										<label htmlFor='form-services'>Services / Role</label>
										<input
											id='form-services'
											type='text'
											className='admin-input'
											placeholder='Role or services...'
											value={formData.services}
											onChange={(e) =>
												handleFormChange('services', e.target.value)
											}
										/>
									</div>

									{activeTab === 'works' && (
										<div className='admin-form-group'>
											<label htmlFor='form-slug'>
												Slug
												<span
													style={{
														color: '#6b6b7b',
														fontWeight: 400,
														fontSize: '12px',
														marginLeft: 8,
													}}
												>
													URL: /work/
													<strong>
														{formData.slug ||
															titleToSlug(formData.title) ||
															'...'}
													</strong>
												</span>
											</label>
											<input
												id='form-slug'
												type='text'
												className='admin-input'
												placeholder='auto-generated-from-title'
												value={formData.slug ?? titleToSlug(formData.title)}
												onChange={(e) => {
													setFormData((p) => ({ ...p, slug: e.target.value }));
													setCsForm((p) => ({ ...p, slug: e.target.value }));
												}}
											/>
										</div>
									)}

									<div className='admin-form-row'>
										<div className='admin-form-group'>
											<label htmlFor='form-src'>Image Filename</label>
											<input
												id='form-src'
												type='text'
												className='admin-input'
												placeholder='image.png'
												value={formData.src}
												onChange={(e) =>
													handleFormChange('src', e.target.value)
												}
											/>
										</div>
										<div className='admin-form-group'>
											<label htmlFor='form-color'>Card Color</label>
											<div className='admin-color-preview'>
												<input
													type='color'
													className='admin-color-swatch'
													value={formData.color}
													onChange={(e) =>
														handleFormChange('color', e.target.value)
													}
												/>
												<input
													id='form-color'
													type='text'
													className='admin-input'
													placeholder='#dbeafe'
													value={formData.color}
													onChange={(e) =>
														handleFormChange('color', e.target.value)
													}
												/>
											</div>
										</div>
									</div>

									<div className='admin-form-group'>
										<label>Upload Image</label>
										<div className='admin-file-upload-container'>
											<div className='admin-file-upload-btn-wrapper'>
												<div className='admin-file-upload-btn'>
													{uploading
														? 'Processing...'
														: 'Choose Image (PNG, JPG, HEIC…)'}
												</div>
												<input
													type='file'
													accept='image/png,image/jpeg,image/jpg,image/gif,image/heic,.heic,.HEIC'
													onChange={handleImageUpload}
													disabled={uploading}
												/>
											</div>
											{uploading && (
												<div className='admin-uploading-text'>
													<span
														className='admin-spinner'
														style={{
															width: '0.875rem',
															height: '0.875rem',
															borderWidth: '1.5px',
															borderTopColor: '#60a5fa',
														}}
													/>
													<span>Converting and uploading…</span>
												</div>
											)}
										</div>
									</div>

									<div className='admin-form-group'>
										<label htmlFor='form-url'>
											External URL
											<span
												style={{
													color: '#6b6b7b',
													fontWeight: 400,
													fontSize: '12px',
													marginLeft: 8,
												}}
											>
												(used when no case study exists)
											</span>
										</label>
										<input
											id='form-url'
											type='text'
											className='admin-input'
											placeholder='https://...'
											value={formData.url}
											onChange={(e) => handleFormChange('url', e.target.value)}
										/>
									</div>

									<div className='admin-form-group'>
										<label>Categories</label>
										<div className='admin-category-selector'>
											{(activeTab === 'works'
												? workCategories
												: certCategories
											).map((cat) => {
												const isSelected = formData.categories.includes(
													cat.key,
												);
												return (
													<button
														key={cat.key}
														type='button'
														className={`admin-category-btn ${isSelected ? 'selected' : ''}`}
														onClick={() => handleCategoryToggle(cat.key)}
													>
														{cat.label}
													</button>
												);
											})}
										</div>
									</div>
								</>
							)}

							{/* ── CASE STUDY TAB ─────────────────────────── */}
							{modalTab === 'casestudy' && activeTab === 'works' && (
								<div className='admin-cs-form'>
									{!csLoaded ? (
										<div className='admin-loading'>
											<span className='admin-spinner' />
											<span>Loading case study...</span>
										</div>
									) : (
										<>
											{/* Preview link */}
											{csForm.slug && (
												<div className='admin-cs-preview-bar'>
													<span style={{ color: '#6b6b7b', fontSize: 13 }}>
														Preview:
													</span>
													<a
														href={`/work/${csForm.slug}`}
														target='_blank'
														rel='noopener noreferrer'
														className='admin-cs-preview-link'
													>
														/work/{csForm.slug} <ExternalLinkIcon />
													</a>
												</div>
											)}

											{/* ── AI fill */}
											<div className='admin-ai-panel'>
												<button
													type='button'
													className={`admin-ai-toggle${aiOpen ? ' open' : ''}`}
													onClick={() => setAiOpen((o) => !o)}
												>
													<SparkleIcon />
													<span>AI Fill from document</span>
													<span className='admin-ai-toggle-chevron'>
														{aiOpen ? '▲' : '▼'}
													</span>
												</button>

												{aiOpen && (
													<div className='admin-ai-body'>
														<p className='admin-ai-hint'>
															Upload a project doc (PDF, TXT, MD, or a
															screenshot) and Gemini drafts the written sections
															below. Media, slug, and navigation are never
															touched — and nothing is saved until you hit “Save
															Case Study”.
														</p>

														<div className='admin-form-group'>
															<label htmlFor='ai-notes'>
																Extra context
																<span
																	style={{
																		color: '#6b6b7b',
																		fontWeight: 400,
																		fontSize: 12,
																		marginLeft: 8,
																	}}
																>
																	(optional — anything the doc leaves out)
																</span>
															</label>
															<textarea
																id='ai-notes'
																className='admin-textarea'
																rows={2}
																placeholder='e.g. I was the only engineer; the client name stays confidential.'
																value={aiNotes}
																onChange={(e) => setAiNotes(e.target.value)}
															/>
														</div>

														<div className='admin-ai-actions'>
															<div className='admin-file-upload-btn-wrapper'>
																<div
																	className={`admin-ai-upload-btn${aiFilling ? ' disabled' : ''}`}
																>
																	{aiFilling ? (
																		<>
																			<span
																				className='admin-spinner'
																				style={{
																					width: '0.875rem',
																					height: '0.875rem',
																					borderWidth: '1.5px',
																					borderTopColor: '#a78bfa',
																				}}
																			/>
																			<span>Reading {aiFileName}…</span>
																		</>
																	) : (
																		<>
																			<SparkleIcon />
																			<span>Choose document</span>
																		</>
																	)}
																</div>
																<input
																	type='file'
																	accept='.pdf,.txt,.md,.markdown,.csv,.json,.html,.htm,.rtf,.png,.jpg,.jpeg,.webp'
																	onChange={handleAiFill}
																	disabled={aiFilling}
																/>
															</div>

															<label className='admin-cs-toggle'>
																<input
																	type='checkbox'
																	checked={aiOverwrite}
																	onChange={(e) =>
																		setAiOverwrite(e.target.checked)
																	}
																/>
																<span>
																	Overwrite fields that already have content
																</span>
															</label>
														</div>
													</div>
												)}
											</div>

											{/* ── Identity */}
											<div className='admin-cs-section-label'>Hero</div>

											<div className='admin-form-row'>
												<div className='admin-form-group'>
													<label>Company</label>
													<input
														type='text'
														className='admin-input'
														placeholder='e.g. Ixana'
														value={csForm.company}
														onChange={(e) =>
															csChange('company', e.target.value)
														}
													/>
												</div>
												<div className='admin-form-group'>
													<label>Organization / Team</label>
													<input
														type='text'
														className='admin-input'
														placeholder="e.g. Founder's Office"
														value={csForm.organization}
														onChange={(e) =>
															csChange('organization', e.target.value)
														}
													/>
												</div>
											</div>

											<div className='admin-form-row'>
												<div className='admin-form-group'>
													<label>Date range</label>
													<input
														type='text'
														className='admin-input'
														placeholder='Jan 2024 – Present'
														value={csForm.dateRange}
														onChange={(e) =>
															csChange('dateRange', e.target.value)
														}
													/>
												</div>
												<div className='admin-form-group'>
													<label>Your role</label>
													<input
														type='text'
														className='admin-input'
														placeholder='e.g. Product Lead'
														value={csForm.role}
														onChange={(e) => csChange('role', e.target.value)}
													/>
												</div>
											</div>

											<div className='admin-form-row'>
												<div className='admin-form-group'>
													<label>Team size</label>
													<input
														type='text'
														className='admin-input'
														placeholder='e.g. 4 people'
														value={csForm.teamSize}
														onChange={(e) =>
															csChange('teamSize', e.target.value)
														}
													/>
												</div>
												<div className='admin-form-group'>
													<label>
														Tags{' '}
														<span
															style={{
																color: '#6b6b7b',
																fontWeight: 400,
																fontSize: 12,
															}}
														>
															(comma-separated)
														</span>
													</label>
													<input
														type='text'
														className='admin-input'
														placeholder='AI/ML, System Design, Patent'
														value={csForm.tags}
														onChange={(e) => csChange('tags', e.target.value)}
													/>
												</div>
											</div>

											<div className='admin-cs-toggle-row'>
												<label className='admin-cs-toggle'>
													<input
														type='checkbox'
														checked={csForm.isConfidential}
														onChange={(e) =>
															csChange('isConfidential', e.target.checked)
														}
													/>
													<span>Confidential / NDA</span>
												</label>
											</div>

											{csForm.isConfidential && (
												<div className='admin-form-group'>
													<label>
														Confidential note{' '}
														<span
															style={{
																color: '#6b6b7b',
																fontWeight: 400,
																fontSize: 12,
															}}
														>
															(shown instead of media grid)
														</span>
													</label>
													<textarea
														className='admin-textarea'
														rows={2}
														placeholder='Details withheld under NDA...'
														value={csForm.confidentialNote}
														onChange={(e) =>
															csChange('confidentialNote', e.target.value)
														}
													/>
												</div>
											)}

											{/* ── TL;DR */}
											<div className='admin-cs-section-label'>TL;DR</div>
											<div className='admin-form-group'>
												<label>
													2–3 sentences: problem · what you did · result
												</label>
												<textarea
													className='admin-textarea'
													rows={3}
													placeholder='e.g. XANA is a multifile RAG platform built at Ixana...'
													value={csForm.tldr}
													onChange={(e) => csChange('tldr', e.target.value)}
												/>
											</div>

											{/* ── Context */}
											<div className='admin-cs-section-label'>
												Context and problem
											</div>
											<div className='admin-form-group'>
												<textarea
													className='admin-textarea'
													rows={4}
													placeholder='Describe the landscape. What gap existed? What made this hard?'
													value={csForm.context}
													onChange={(e) => csChange('context', e.target.value)}
												/>
											</div>

											{/* ── Role and approach */}
											<div className='admin-cs-section-label'>
												My role and approach
											</div>
											<div className='admin-form-group'>
												<textarea
													className='admin-textarea'
													rows={4}
													placeholder='What did you own? 2–3 key decisions? Tradeoffs you navigated?'
													value={csForm.roleAndApproach}
													onChange={(e) =>
														csChange('roleAndApproach', e.target.value)
													}
												/>
											</div>

											<div className='admin-cs-toggle-row'>
												<label className='admin-cs-toggle'>
													<input
														type='checkbox'
														checked={csForm.showKeyDecision}
														onChange={(e) =>
															csChange('showKeyDecision', e.target.checked)
														}
													/>
													<span>Show key decision highlight card</span>
												</label>
											</div>

											{csForm.showKeyDecision && (
												<div className='admin-cs-card'>
													<div className='admin-form-group'>
														<label>
															Card label{' '}
															<span
																style={{
																	color: '#6b6b7b',
																	fontWeight: 400,
																	fontSize: 12,
																}}
															>
																(default: "Key decision")
															</span>
														</label>
														<input
															type='text'
															className='admin-input'
															value={csForm.keyDecisionLabel}
															onChange={(e) =>
																csChange('keyDecisionLabel', e.target.value)
															}
														/>
													</div>
													<div className='admin-form-group'>
														<label>Decision</label>
														<textarea
															className='admin-textarea'
															rows={2}
															placeholder='We chose to build a custom ingestion pipeline...'
															value={csForm.keyDecision}
															onChange={(e) =>
																csChange('keyDecision', e.target.value)
															}
														/>
													</div>
													<div className='admin-form-group'>
														<label>Reasoning</label>
														<textarea
															className='admin-textarea'
															rows={2}
															placeholder='Off-the-shelf tools could not handle...'
															value={csForm.keyDecisionReasoning}
															onChange={(e) =>
																csChange('keyDecisionReasoning', e.target.value)
															}
														/>
													</div>
												</div>
											)}

											{/* ── What was built */}
											<div className='admin-cs-section-label'>
												What was built
											</div>
											<div className='admin-form-group'>
												<textarea
													className='admin-textarea'
													rows={4}
													placeholder='High-level description of the solution: what it is, how it works, who it serves.'
													value={csForm.whatWasBuilt}
													onChange={(e) =>
														csChange('whatWasBuilt', e.target.value)
													}
												/>
											</div>

											{/* ── Media */}
											{!csForm.isConfidential && (
												<>
													<div className='admin-cs-section-label'>
														Media
														<button
															type='button'
															className='admin-cs-add-row-btn'
															onClick={addMediaRow}
														>
															+ Add slot
														</button>
													</div>
													{csForm.media.map((m, i) => (
														<div
															key={i}
															className={`admin-cs-row-card${mediaDragIndex === i ? ' dragging' : ''}${mediaDragOverIndex === i ? ' drag-over' : ''}`}
															draggable
															onDragStart={() => handleMediaDragStart(i)}
															onDragOver={(e) => handleMediaDragOver(e, i)}
															onDrop={() => handleMediaDrop(i)}
															onDragEnd={handleMediaDragEnd}
														>
															<div
																className='admin-form-row'
																style={{ alignItems: 'center' }}
															>
																<div
																	className='admin-drag-handle'
																	title='Drag to reorder'
																	style={{
																		cursor: 'grab',
																		marginTop: '12px',
																		opacity: 0.5,
																	}}
																>
																	<GripIcon />
																</div>
																<div
																	className='admin-form-group'
																	style={{ flex: '0 0 110px' }}
																>
																	<label>Type</label>
																	<select
																		className='admin-input'
																		value={m.type}
																		onChange={(e) =>
																			updateMedia(i, 'type', e.target.value)
																		}
																	>
																		<option value='image'>Image</option>
																		<option value='gif'>GIF</option>
																		<option value='video'>Video</option>
																		<option value='demo'>Demo</option>
																	</select>
																</div>
																<div className='admin-form-group'>
																	<label>Source (path or URL)</label>
																	<input
																		type='text'
																		className='admin-input'
																		placeholder={
																			m.type === 'image' || m.type === 'gif'
																				? 'filename.png'
																				: 'https://youtube.com/watch?v=...'
																		}
																		value={m.src}
																		onChange={(e) =>
																			updateMedia(i, 'src', e.target.value)
																		}
																	/>
																</div>
																<button
																	type='button'
																	className='admin-btn-icon delete admin-cs-row-delete'
																	onClick={() => removeMedia(i)}
																	title='Remove'
																>
																	<TrashIcon />
																</button>
															</div>
															<div className='admin-form-row'>
																<div className='admin-form-group'>
																	<label>
																		Caption{' '}
																		<span
																			style={{
																				color: '#6b6b7b',
																				fontWeight: 400,
																				fontSize: 12,
																			}}
																		>
																			(optional)
																		</span>
																	</label>
																	<input
																		type='text'
																		className='admin-input'
																		placeholder='Describe this image...'
																		value={m.caption}
																		onChange={(e) =>
																			updateMedia(i, 'caption', e.target.value)
																		}
																	/>
																</div>
																<label
																	className='admin-cs-toggle'
																	style={{
																		alignSelf: 'flex-end',
																		marginBottom: 4,
																	}}
																>
																	<input
																		type='checkbox'
																		checked={m.fullWidth}
																		onChange={(e) =>
																			updateMedia(
																				i,
																				'fullWidth',
																				e.target.checked,
																			)
																		}
																	/>
																	<span>Full width</span>
																</label>
															</div>
															{(m.type === 'image' || m.type === 'gif') && (
																<div
																	className='admin-form-group'
																	style={{ marginTop: 8 }}
																>
																	<label>Upload Image</label>
																	<div className='admin-file-upload-container'>
																		<div className='admin-file-upload-btn-wrapper'>
																			<div className='admin-file-upload-btn'>
																				{uploading
																					? 'Processing...'
																					: 'Choose Image (PNG, JPG, HEIC…)'}
																			</div>
																			<input
																				type='file'
																				accept='image/png,image/jpeg,image/jpg,image/gif,image/heic,.heic,.HEIC'
																				onChange={(e) =>
																					handleMediaImageUpload(i, e)
																				}
																				disabled={uploading}
																			/>
																		</div>
																	</div>
																</div>
															)}
														</div>
													))}
												</>
											)}

											{/* ── Metrics */}
											<div className='admin-cs-section-label'>
												Impact metrics
												<button
													type='button'
													className='admin-cs-add-row-btn'
													onClick={addMetricRow}
												>
													+ Add metric
												</button>
											</div>
											{csForm.metrics.map((m, i) => (
												<div key={i} className='admin-cs-row-card'>
													<div
														className='admin-form-row'
														style={{ alignItems: 'flex-end' }}
													>
														<div
															className='admin-form-group'
															style={{ flex: '0 0 140px' }}
														>
															<label>Value</label>
															<input
																type='text'
																className='admin-input'
																placeholder='2x, ~40%, 14k+'
																value={m.value}
																onChange={(e) =>
																	updateMetric(i, 'value', e.target.value)
																}
															/>
														</div>
														<div className='admin-form-group'>
															<label>Label</label>
															<input
																type='text'
																className='admin-input'
																placeholder='Speed improvement'
																value={m.label}
																onChange={(e) =>
																	updateMetric(i, 'label', e.target.value)
																}
															/>
														</div>
														<button
															type='button'
															className='admin-btn-icon delete admin-cs-row-delete'
															onClick={() => removeMetric(i)}
															title='Remove'
														>
															<TrashIcon />
														</button>
													</div>
												</div>
											))}

											<div
												className='admin-form-group'
												style={{ marginTop: 8 }}
											>
												<label>
													Impact context{' '}
													<span
														style={{
															color: '#6b6b7b',
															fontWeight: 400,
															fontSize: 12,
														}}
													>
														(narrative below metrics)
													</span>
												</label>
												<textarea
													className='admin-textarea'
													rows={3}
													placeholder='What do the numbers mean for the business, team, or customer?'
													value={csForm.impactContext}
													onChange={(e) =>
														csChange('impactContext', e.target.value)
													}
												/>
											</div>

											{/* ── Reflection */}
											<div className='admin-cs-toggle-row'>
												<label className='admin-cs-toggle'>
													<input
														type='checkbox'
														checked={csForm.showReflection}
														onChange={(e) =>
															csChange('showReflection', e.target.checked)
														}
													/>
													<span>Show reflection section</span>
												</label>
											</div>

											{csForm.showReflection && (
												<div className='admin-form-group'>
													<label>Reflection</label>
													<textarea
														className='admin-textarea'
														rows={4}
														placeholder='What would you do differently? What surprised you? What did you learn?'
														value={csForm.reflection}
														onChange={(e) =>
															csChange('reflection', e.target.value)
														}
													/>
												</div>
											)}

											{/* ── Links */}
											<div className='admin-cs-section-label'>
												Go deeper — links
												<button
													type='button'
													className='admin-cs-add-row-btn'
													onClick={addLinkRow}
												>
													+ Add link
												</button>
											</div>
											{csForm.links.map((lnk, i) => (
												<div key={i} className='admin-cs-row-card'>
													<div
														className='admin-form-row'
														style={{ alignItems: 'flex-end' }}
													>
														<div
															className='admin-form-group'
															style={{ flex: '0 0 130px' }}
														>
															<label>Icon</label>
															<select
																className='admin-input'
																value={lnk.icon}
																onChange={(e) =>
																	updateLink(i, 'icon', e.target.value)
																}
															>
																{LINK_ICON_OPTIONS.map((opt) => (
																	<option key={opt} value={opt}>
																		{opt}
																	</option>
																))}
															</select>
														</div>
														<div
															className='admin-form-group'
															style={{ flex: '0 0 160px' }}
														>
															<label>Label</label>
															<input
																type='text'
																className='admin-input'
																placeholder='Source code'
																value={lnk.label}
																onChange={(e) =>
																	updateLink(i, 'label', e.target.value)
																}
															/>
														</div>
														<div className='admin-form-group'>
															<label>URL</label>
															<input
																type='text'
																className='admin-input'
																placeholder='https://...'
																value={lnk.url}
																onChange={(e) =>
																	updateLink(i, 'url', e.target.value)
																}
															/>
														</div>
														<button
															type='button'
															className='admin-btn-icon delete admin-cs-row-delete'
															onClick={() => removeLink(i)}
															title='Remove'
														>
															<TrashIcon />
														</button>
													</div>
												</div>
											))}

											{/* ── Bottom nav */}
											<div className='admin-cs-section-label'>
												Bottom navigation{' '}
												<span
													style={{
														color: '#6b6b7b',
														fontWeight: 400,
														fontSize: 12,
													}}
												>
													(optional prev/next project links)
												</span>
											</div>
											<div className='admin-cs-card'>
												<div className='admin-form-row'>
													<div className='admin-form-group'>
														<label>← Prev project slug</label>
														<input
															type='text'
															className='admin-input'
															placeholder='other-project-slug'
															value={csForm.prevSlug}
															onChange={(e) =>
																csChange('prevSlug', e.target.value)
															}
														/>
													</div>
													<div className='admin-form-group'>
														<label>← Prev project title</label>
														<input
															type='text'
															className='admin-input'
															placeholder='Other Project'
															value={csForm.prevTitle}
															onChange={(e) =>
																csChange('prevTitle', e.target.value)
															}
														/>
													</div>
												</div>
												<div className='admin-form-row'>
													<div className='admin-form-group'>
														<label>Next project slug →</label>
														<input
															type='text'
															className='admin-input'
															placeholder='another-project-slug'
															value={csForm.nextSlug}
															onChange={(e) =>
																csChange('nextSlug', e.target.value)
															}
														/>
													</div>
													<div className='admin-form-group'>
														<label>Next project title →</label>
														<input
															type='text'
															className='admin-input'
															placeholder='Another Project'
															value={csForm.nextTitle}
															onChange={(e) =>
																csChange('nextTitle', e.target.value)
															}
														/>
													</div>
												</div>
											</div>
										</>
									)}
								</div>
							)}
						</div>

						{/* Modal footer */}
						<div className='admin-modal-footer'>
							<button
								type='button'
								className='admin-btn-secondary'
								onClick={() => setModalOpen(false)}
							>
								Cancel
							</button>

							{modalTab === 'casestudy' ? (
								<>
									<button
										type='button'
										className='admin-btn-secondary'
										onClick={handleSaveItem}
										disabled={saving}
									>
										{saving ? (
											<span className='admin-spinner' />
										) : (
											'Save Basic Info'
										)}
									</button>
									<button
										type='button'
										className='admin-btn-save'
										onClick={handleSaveCaseStudy}
										disabled={csSaving || !csLoaded}
									>
										{csSaving ? (
											<span className='admin-spinner' />
										) : (
											'💾 Save Case Study'
										)}
									</button>
								</>
							) : (
								<button
									type='button'
									className='admin-btn-save'
									onClick={handleSaveItem}
									disabled={saving || !formData.title}
								>
									{saving ? (
										<span className='admin-spinner' />
									) : editIndex !== null ? (
										'Save Changes'
									) : (
										'Add Item'
									)}
								</button>
							)}
						</div>
					</div>
				</div>
			)}

			{/* ─── Delete Confirmation ─────────────────────────── */}
			{deleteIndex !== null && (
				<div
					className='admin-modal-overlay'
					onClick={(e) => {
						if (e.target === e.currentTarget) setDeleteIndex(null);
					}}
				>
					<div
						className='admin-modal admin-delete-modal'
						data-lenis-prevent='true'
					>
						<div className='admin-delete-body'>
							<div className='admin-delete-icon'>
								<AlertIcon />
							</div>
							<h3>Delete Item?</h3>
							<p>
								Are you sure you want to delete{' '}
								<span className='item-name'>
									&quot;{currentItems[deleteIndex]?.title}&quot;
								</span>
								? This action cannot be undone.
							</p>
						</div>
						<div className='admin-delete-footer'>
							<button
								type='button'
								className='admin-btn-secondary'
								onClick={() => setDeleteIndex(null)}
							>
								Cancel
							</button>
							<button
								type='button'
								className='admin-btn-delete'
								onClick={handleDelete}
								disabled={saving}
							>
								{saving ? <span className='admin-spinner' /> : 'Delete'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ─── Toast ───────────────────────────────────────── */}
			{toast && (
				<div className={`admin-toast ${toast.type}`}>
					{toast.type === 'success' ? <CheckIcon /> : <AlertIcon />}
					{toast.message}
				</div>
			)}
		</div>
	);
}
