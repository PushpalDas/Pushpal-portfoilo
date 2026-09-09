import type { Metadata } from 'next';
import '../books/books.css';
import HobbySwitch from './hobby-switch';
import './hoobie.css';

export const metadata: Metadata = {
	title: 'Photography & Books',
	description:
		'Pushpal Das off the clock — a personal photography archive of people, wildlife, places and passing light, and the books he reads and returns to.',
};

export default function Page() {
	return <HobbySwitch />;
}
