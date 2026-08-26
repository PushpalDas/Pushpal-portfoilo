import Contact from './components/contact';
import Hero from './components/hero/hero';
import Intro from './components/intro';
import Works from './components/work/works';

export default function Home() {
	return (
		<>
			<Hero />
			<Intro />
			<Works />
			<Contact />
		</>
	);
}
