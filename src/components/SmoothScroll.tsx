'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const lenis = new Lenis({
			lerp: 0.075,          // float momentum — lower = more inertia
			wheelMultiplier: 1.4, // more travel per scroll tick
			touchMultiplier: 1.6,
			anchors: true,        // smooth #hash scrolls (CSS smooth-behavior is off)
		});

		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}
		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}
