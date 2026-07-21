'use client';

import { useCallback, useEffect, useState } from 'react';
import './admin.css';

/* ─── Types ───────────────────────────── */

interface ItemData {
	title: string;
	location: string;
	services: string;
	year: string;
	src: string;
	color: string;
	url: string;
	categories: string[];
}

type TabKey = 'works' | 'certifications';

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
	categories: [],
};

/* ─── Icons ───────────────────────────── */

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

/* ─── Main Component ──────────────────── */

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
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [formData, setFormData] = useState<ItemData>(emptyItem);

	const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
	const [toast, setToast] = useState<Toast | null>(null);
	const [uploading, setUploading] = useState(false);

	/* ─── Drag & Drop state ──────────── */
	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	const storedPassword = password;

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
				headers: {
					'x-admin-password': storedPassword,
				},
				body: uploadData,
			});

			if (res.ok) {
				const data = await res.json();
				if (data.success && data.filename) {
					handleFormChange('src', data.filename);
					showToast('Image uploaded successfully!', 'success');
				} else {
					showToast(data.error || 'Upload failed', 'error');
				}
			} else {
				const data = await res.json();
				showToast(data.error || 'Upload failed', 'error');
			}
		} catch {
			showToast('Connection failed during upload', 'error');
		} finally {
			setUploading(false);
			e.target.value = '';
		}
	};

	/* ─── Auth ─────────────────────────── */

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

	/* ─── Toast ────────────────────────── */

	const showToast = useCallback(
		(message: string, type: 'success' | 'error') => {
			setToast({ message, type });
			setTimeout(() => setToast(null), 3000);
		},
		[],
	);

	/* ─── Fetch Data ───────────────────── */

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
				setWorkCategories(data.filters.filter((f: any) => f.key !== 'all'));
			}
			if (certsRes.ok) {
				const data = await certsRes.json();
				setCertItems(data.items);
				setCertCategories(data.filters.filter((f: any) => f.key !== 'all'));
			}
		} catch {
			showToast('Failed to load data', 'error');
		} finally {
			setLoading(false);
		}
	}, [storedPassword, showToast]);

	useEffect(() => {
		if (authenticated) {
			fetchData();
		}
	}, [authenticated, fetchData]);

	/* ─── Get current items ────────────── */

	const currentItems = activeTab === 'works' ? workItems : certItems;
	const setCurrentItems = activeTab === 'works' ? setWorkItems : setCertItems;
	const apiPath =
		activeTab === 'works' ? '/api/admin/works' : '/api/admin/certifications';

	/* ─── Save to file ─────────────────── */

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

	/* ─── Add / Edit ───────────────────── */

	const openAddModal = () => {
		setEditIndex(null);
		setFormData({ ...emptyItem, categories: [] });
		setModalOpen(true);
	};

	const openEditModal = (index: number) => {
		const item = currentItems[index];
		setEditIndex(index);
		setFormData({ ...item });
		setModalOpen(true);
	};

	const handleFormChange = (field: keyof ItemData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleCategoryToggle = (categoryKey: string) => {
		setFormData((prev) => {
			const hasCat = prev.categories.includes(categoryKey);
			if (hasCat) {
				return {
					...prev,
					categories: prev.categories.filter((c) => c !== categoryKey),
				};
			}
			return { ...prev, categories: [...prev.categories, categoryKey] };
		});
	};

	const handleSaveItem = async () => {
		const item: ItemData = { ...formData };

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

	/* ─── Drag & Drop handlers ─────────── */

	const handleDragStart = (index: number) => {
		setDragIndex(index);
	};

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

	/* ─── Quick reorder (arrow buttons) ── */

	const moveItem = async (fromIndex: number, toIndex: number) => {
		if (toIndex < 0 || toIndex >= currentItems.length) return;
		const newItems = [...currentItems];
		const [movedItem] = newItems.splice(fromIndex, 1);
		newItems.splice(toIndex, 0, movedItem);
		setCurrentItems(newItems);
		await saveItems(newItems);
	};

	/* ─── Move to top of its category group ── */

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

	/* ─── Group items by primary category ─ */

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

		// Uncategorised items (don't match any known group)
		const uncatItems: { item: ItemData; globalIndex: number }[] = [];
		currentItems.forEach((item, i) => {
			if (!seen.has(i)) {
				uncatItems.push({ item, globalIndex: i });
				seen.add(i);
			}
		});
		if (uncatItems.length > 0) {
			groups.push({ label: 'Other', key: 'other', items: uncatItems });
		}

		return groups;
	})();

	const handleDelete = async () => {
		if (deleteIndex === null) return;

		const newItems = currentItems.filter((_, i) => i !== deleteIndex);
		const saved = await saveItems(newItems);
		if (saved) {
			setCurrentItems(newItems);
			setDeleteIndex(null);
		}
	};

	/* ─── Login Screen ─────────────────── */

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
							autoFocus
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

	/* ─── Dashboard ────────────────────── */

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

				{/* Items List — Grouped by category */}
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
											{/* Quick reorder buttons */}
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
													title='Move to top of group'
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
											{/* Edit / Delete */}
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

			{/* ─── Add/Edit Modal ───────── */}
			{modalOpen && (
				<div
					className='admin-modal-overlay'
					onClick={(e) => {
						if (e.target === e.currentTarget) setModalOpen(false);
					}}
				>
					<div className='admin-modal' data-lenis-prevent='true'>
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

						<div className='admin-modal-body'>
							{formData.src && (
								<div className='admin-modal-image-preview'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={`/static/images/project/${formData.src}`}
										alt='Preview'
										onError={(e) => {
											(e.target as HTMLImageElement).src =
												'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTU1NSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIHJ5PSIyIi8+PGNpcmNsZSBjeD0iOC41IiBjeT0iOC41IiByPSIxLjUiLz4vcG9seWxpbmUgcG9pbnRzPSIyMSAxNSAxNiAxMCA1IDIxIi8+PC9zdmc+';
										}}
									/>
								</div>
							)}
							<div className='admin-form-group'>
								<label htmlFor='form-title'>Title</label>
								<textarea
									id='form-title'
									className='admin-textarea'
									placeholder='Item title...'
									value={formData.title}
									onChange={(e) => handleFormChange('title', e.target.value)}
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
										onChange={(e) => handleFormChange('year', e.target.value)}
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
									onChange={(e) => handleFormChange('services', e.target.value)}
								/>
							</div>

							<div className='admin-form-row'>
								<div className='admin-form-group'>
									<label htmlFor='form-src'>Image Filename</label>
									<input
										id='form-src'
										type='text'
										className='admin-input'
										placeholder='image.png'
										value={formData.src}
										onChange={(e) => handleFormChange('src', e.target.value)}
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
												? 'Processing Image...'
												: 'Choose Image (Supports PNG, JPG, HEIC, etc.)'}
										</div>
										<input
											type='file'
											accept='image/png, image/jpeg, image/jpg, image/gif, image/heic, .heic, .HEIC'
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
											<span>Converting and uploading photo...</span>
										</div>
									)}
								</div>
							</div>

							<div className='admin-form-group'>
								<label htmlFor='form-url'>URL</label>
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
										const isSelected = formData.categories.includes(cat.key);
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
						</div>

						<div className='admin-modal-footer'>
							<button
								type='button'
								className='admin-btn-secondary'
								onClick={() => setModalOpen(false)}
							>
								Cancel
							</button>
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
						</div>
					</div>
				</div>
			)}

			{/* ─── Delete Confirmation ──── */}
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

			{/* ─── Toast ────────────────── */}
			{toast && (
				<div className={`admin-toast ${toast.type}`}>
					{toast.type === 'success' ? <CheckIcon /> : <AlertIcon />}
					{toast.message}
				</div>
			)}
		</div>
	);
}
