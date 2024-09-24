import { Card, CardContent } from "@/components/ui/card";
import { useGlobalContext } from "@/contexts/global-context";
//@ts-ignore
import * as ptBr from "plotly.js/lib/locales/pt-br";
import Plot from "react-plotly.js";
import { useScreenDetector } from "../home/components/top-bar/hooks/useScreenDetector";

export type Axes = "x" | "y";

export interface ChartConfigProps {
  eixos: [Axes, Axes];
  titulo?: string;
}

export interface ChartDataProps {
  data1: number[];
  data2: number[];
}

interface MultiPlotData {
  x: number[];
  y: number[];
  color: string;
  maxHeightPoint?: [number, number];
}

interface ChartCardComponentProps {
  data?: ChartDataProps;
  multiplot?: MultiPlotData[];
  graficoConfig: ChartConfigProps;
  maxHeightPoint?: [number, number];
}

export const ChartCardComponent = ({
  data,
  multiplot,
  graficoConfig,
  maxHeightPoint,
}: ChartCardComponentProps) => {
  const gridColor = "rgb(39 39 42)";
  const { chartColor } = useGlobalContext();
  const { width } = useScreenDetector();

  const multiplotChartWidth = width > 1024 ? 800 : width - 40;
  const chartWidth = width > 1024 ? 500 : width;

  const plotData: any[] = multiplot
    ? multiplot.map((plot, index) => ({
        x: plot.x,
        y: plot.y,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: plot.color },
        line: { color: plot.color },
        name: `Lançamento ${index + 1}`,
      }))
    : [
        {
          x: data?.data1 || [],
          y: data?.data2 || [],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: chartColor },
          line: { color: chartColor },
        },
      ];

  if (maxHeightPoint) {
    const maxHeightTrace = {
      x: [maxHeightPoint[0]],
      y: [maxHeightPoint[1]],
      mode: "markers",
      marker: { color: "orange", size: 10 },
      type: "scatter",
      name: "ALtura máx.",
    };
    plotData.push(maxHeightTrace);
  }

  multiplot &&
    multiplot.forEach((plot, index) => {
      if (plot.maxHeightPoint) {
        const maxHeightTrace = {
          x: [plot.maxHeightPoint[0]],
          y: [plot.maxHeightPoint[1]],
          mode: "markers",
          marker: { color: "orange", size: 10 },
          type: "scatter",
          name: "Altura máx. " + Number(index + 1).toString(),
        };
        plotData.push(maxHeightTrace);
      }
    });

  const layout: any = {
    title: {
      text: graficoConfig.titulo || "Meu gráfico",
      font: { color: "white" },
    },
    width: multiplot ? multiplotChartWidth : chartWidth,
    height: multiplot ? 600 : 320,
    legend: {
      xanchor: "center",
      yanchor: "top",
      y: multiplot ? -0.15 : -0.5,
      x: 0.5,
    },

    paper_bgcolor: "#040405",
    plot_bgcolor: "#040405",

    xaxis: {
      title: graficoConfig.eixos[0] || "x",
      titlefont: { color: "white" },
      tickfont: { color: "white" },
      gridcolor: gridColor,
      zerolinecolor: gridColor,
    },
    yaxis: {
      title: graficoConfig.eixos[1] || "y",
      titlefont: { color: "white" },
      tickfont: { color: "white" },
      gridcolor: gridColor,
      zerolinecolor: gridColor,
    },
  };

  return (
    <Card className="w-fit mx-auto">
      <CardContent
        style={{
          width: multiplot ? multiplotChartWidth : chartWidth,
          height: multiplot ? 600 : 320,
        }}
        className="flex h-[600px] items-center justify-center overflow-hidden rounded-md py-0 pl-0 pr-4 bg-[#040405]"
      >
        <Plot
          config={{
            showTips: false,
            displaylogo: false,
            displayModeBar: true,
            toImageButtonOptions: {
              width: 800 * 2,
              height: 600 * 2,
              format: "svg",
            },
            locales: {
              "pt-br": ptBr,
            },
            locale: "pt-br",
          }}
          data={plotData}
          layout={layout}
        />
      </CardContent>
    </Card>
  );
};
