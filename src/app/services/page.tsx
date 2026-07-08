import type { Metadata } from 'next';

import { StrategicSolutions } from '@/components/sections/StrategicSolutions';
import { TechnicalOverview } from '@/components/sections/TechnicalOverview';

export const metadata: Metadata = {
	title: 'Luis Viegas',
	description:
		'Complete architectural breakdown of our design and technology stack capabilities, with tailored strategic solutions.',
};

export default function ServicesPage() {
	return (
		<>
			<TechnicalOverview />
			<StrategicSolutions />
		</>
	);
}
