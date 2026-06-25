"use client";

import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion";
import { Fragment, useRef } from "react";

import type { ShowcaseProject } from "@/lib/content";
import { showcase } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";
import { cn } from "@/lib/utils";

/*
  Projects section — cloned from elizadoltuofficial.net.

  One dark, parallaxing surface holds two stacked parts that read the same
  projects array:

  1. MANIFEST  — a 2-col grid; each entry is number + title (left) + a
                 right-aligned feature/blurb list, all in the accent colour.
                 Every word staggers up + fades in as the entry enters view.
  2. GALLERY   — a 2-col grid; each image is uncovered by a black overlay
                 wiping upward (scaleY 1→0, origin top) and drifts vertically
                 with a scroll-driven parallax. Title + stack sit beneath.

  The whole content block also parallaxes a little against the page scroll,
  with pb-[30vh] of slack at the bottom so nothing clips — matching the
  reference's `transform: translateY` + deep bottom padding.
*/

/** Reveal-up word splitter — mirrors the reference's per-word `.word` stagger.
 *  `cursor` threads a running index across an entry so words flow in DOM order. */
function useWordReveal(reduce: boolean | null) {
	return function renderWords(text: string, cursor: { i: number }) {
		if (reduce) return text;
		const words = text.split(" ");
		return words.map((word, idx) => {
			const order = cursor.i++;
			return (
				<Fragment key={`${word}-${order}`}>
					<motion.span
						className="inline-block"
						initial={{ y: "0.5em", opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{
							duration: 0.5,
							delay: order * 0.02,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						{word}
					</motion.span>
					{idx < words.length - 1 ? " " : ""}
				</Fragment>
			);
		});
	};
}

function ManifestEntry({ project }: { project: ShowcaseProject }) {
	const { locale } = useLocale();
	const reduce = useReducedMotion();
	const renderWords = useWordReveal(reduce);
	// Single cursor per entry → title words, then feature words, then blurb.
	const cursor = { i: 0 };

	return (
		<div className="flex flex-1 flex-col flex-wrap text-accent">
			<p className="leading-none">{project.number}</p>
			<div className="flex justify-between gap-4">
				<p className="leading-none">{renderWords(project.title[locale], cursor)}</p>
				<div className="mt-1 text-right leading-none">
					{project.features.map((feature) => (
						<p key={feature.en}>{renderWords(feature[locale], cursor)}</p>
					))}
					<p>{renderWords(project.blurb[locale], cursor)}</p>
				</div>
			</div>
		</div>
	);
}

function GalleryItem({
	project,
	full,
}: {
	project: ShowcaseProject;
	full?: boolean;
}) {
	const { locale } = useLocale();
	const reduce = useReducedMotion();
	const frameRef = useRef<HTMLDivElement>(null);

	// Image drifts within its overflow-hidden frame across the full scroll pass.
	const { scrollYProgress } = useScroll({
		target: frameRef,
		offset: ["start end", "end start"],
	});
	// h-[120%] image → translate the 20% overflow so a gap never shows.
	const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-16.66%"]);

	return (
		<div className={cn("flex flex-col gap-3", full && "md:col-span-2")}>
			<p className="leading-none">{project.number}</p>

			<div
				ref={frameRef}
				className="relative aspect-[4/3] w-full overflow-hidden"
			>
				<motion.img
					src={project.image}
					alt={project.title[locale]}
					className="absolute left-0 top-0 h-[120%] w-full object-cover"
					style={{ y: reduce ? undefined : imageY }}
				/>
				{/* Black wipe — collapses upward (origin top) to uncover the image. */}
				{!reduce && (
					<motion.div
						className="absolute inset-0 origin-top bg-black"
						initial={{ scaleY: 1 }}
						whileInView={{ scaleY: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
					/>
				)}
			</div>

			<div className="flex justify-between gap-4 leading-none">
				<p>{project.title[locale]}</p>
				<div className="mt-1 text-right leading-none">
					<p>{project.category[locale]}</p>
					<p>{project.stack}</p>
				</div>
			</div>
		</div>
	);
}

export function ProjectShowcase() {
	const reduce = useReducedMotion();
	const sectionRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	const contentY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

	const projects = showcase.projects;
	const odd = projects.length % 2 === 1;

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="scroll-mt-16 overflow-hidden bg-[#131313] px-5 pb-[30vh] pt-20 font-mono text-xs uppercase tracking-[0.04em] text-[#e2e1df] md:px-10 md:pt-28 md:text-sm"
		>
			<motion.div style={{ y: reduce ? undefined : contentY }}>
				{/* 1 — Manifest */}
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
					{projects.map((project) => (
						<ManifestEntry key={project.number} project={project} />
					))}
				</div>

				{/* 2 — Gallery */}
				<div className="mt-20 grid grid-cols-1 gap-3 md:grid-cols-2">
					{projects.map((project, index) => (
						<GalleryItem
							key={project.number}
							project={project}
							full={odd && index === projects.length - 1}
						/>
					))}
				</div>
			</motion.div>
		</section>
	);
}
