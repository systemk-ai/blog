import type { EChartsOption } from "echarts";
import { useEffect, useRef } from "react";

interface Props {
	option: EChartsOption;
	height?: number;
}

// Shared ECharts island. echarts is lazy-loaded so it only ships on pages that
// use a chart. Render in MDX with a client directive (DOM-only, never SSR):
//   import EChart from "../../../components/EChart.tsx";
//   <EChart client:visible option={chartOption} height={260} />
export default function EChart({ option, height = 280 }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let disposed = false;
		// biome-ignore lint/suspicious/noExplicitAny: instance type comes from the dynamic import
		let chart: any;
		import("echarts").then((echarts) => {
			if (disposed || !ref.current) return;
			chart = echarts.init(ref.current, undefined, { renderer: "svg" });
			chart.setOption(option);
		});
		const onResize = () => chart?.resize();
		window.addEventListener("resize", onResize);
		return () => {
			disposed = true;
			window.removeEventListener("resize", onResize);
			chart?.dispose();
		};
	}, [option]);

	return <div ref={ref} role="img" style={{ width: "100%", height }} />;
}
