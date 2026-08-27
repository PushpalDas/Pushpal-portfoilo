import type { Metadata } from 'next';
import HoobieGallery from './hoobie-gallery';
import './hoobie.css';

export const metadata: Metadata = {
	title: 'Photography & Hobby',
	description:
		'A personal photography archive by Pushpal Das — people, wildlife, places and passing light.',
};

export default function HoobiePage() {
	return <HoobieGallery />;
}
