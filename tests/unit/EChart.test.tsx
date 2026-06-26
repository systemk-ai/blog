// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import EChart from "../../src/components/EChart.tsx";

// echarts is DOM-heavy and lazy-loaded; mock it so the unit test stays deterministic.
vi.mock("echarts", () => ({
	init: () => ({ setOption: vi.fn(), resize: vi.fn(), dispose: vi.fn() }),
}));

afterEach(cleanup);

test("renders an accessible chart container at the requested height", async () => {
	const { getByRole } = render(<EChart option={{ series: [] }} height={220} />);
	const el = getByRole("img") as HTMLElement;
	expect(el).toBeTruthy();
	expect(el.style.height).toBe("220px");
	// Let the lazy echarts import resolve so the effect completes cleanly.
	await new Promise((resolve) => setTimeout(resolve, 0));
});
