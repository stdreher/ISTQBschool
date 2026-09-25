import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pageCases = [
	{
		file: "src/pages/lessons/[slug].astro",
		completionMarker: 'id="lesson-completed-banner"',
		enrollmentMarker: 'id="lesson-enroll-nudge"',
	},
	{
		file: "src/pages/exercises/[slug].astro",
		completionMarker: 'id="exercise-completed-banner"',
		enrollmentMarker: 'id="exercise-enroll-nudge"',
	},
];

describe("detail page layout", () => {
	it.each(
		pageCases,
	)("places the agent prompt between the completion banner and article in $file", ({
		file,
		completionMarker,
		enrollmentMarker,
	}) => {
		const source = readFileSync(resolve(process.cwd(), file), "utf8");
		const headerIndex = source.indexOf("<header");
		const completionIndex = source.indexOf(completionMarker);
		const promptIndex = source.indexOf("<AgentPrompt");
		const enrollmentIndex = source.indexOf(enrollmentMarker);
		const articleIndex = source.indexOf("<article");

		expect(headerIndex).toBeGreaterThanOrEqual(0);
		expect(completionIndex).toBeGreaterThan(headerIndex);
		expect(promptIndex).toBeGreaterThan(completionIndex);
		expect(enrollmentIndex).toBeGreaterThan(promptIndex);
		expect(articleIndex).toBeGreaterThan(enrollmentIndex);
	});
});
