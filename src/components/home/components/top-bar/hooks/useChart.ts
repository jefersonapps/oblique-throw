import { useGlobalContext } from "@/contexts/global-context";

interface UseChartProps {
  index: number;
}

export function useChart({ index }: UseChartProps) {
  const state = useGlobalContext();
  const tarjectory =
    (state.launchTrajectoriesData && state.launchTrajectoriesData) || [].pop();

  const xData =
    tarjectory && tarjectory.length > 0 && tarjectory[index]
      ? tarjectory[index].data.map((point) => point.left)
      : [];

  const yData =
    tarjectory && tarjectory.length > 0 && tarjectory[index]
      ? tarjectory[index].data.map((point) => point.bottom)
      : [];

  const lastIndex = tarjectory[index] && tarjectory[index].data.length - 1;

  const x1 = xData[lastIndex - 1] ? xData[lastIndex - 1] : 0;

  const y1 = yData[lastIndex - 1] ? yData[lastIndex - 1] : 0;

  const x2 = xData[lastIndex] ? xData[lastIndex] : 0;

  const y2 = yData[lastIndex] ? yData[lastIndex] : 0;

  const slope = (y2 - y1) / (x2 - x1);

  const xFinal = x2 - y2 / slope;

  const lastPoint = state.isLaunching === false ? [xFinal, 0] : [];

  const maxHeightPointOfTrajectory =
    tarjectory[index] &&
    tarjectory[index].data.reduce((prev, current) =>
      prev.bottom > current.bottom ? prev : current
    );

  const maxHeightPoint = [
    maxHeightPointOfTrajectory ? maxHeightPointOfTrajectory.left : undefined,
    maxHeightPointOfTrajectory ? maxHeightPointOfTrajectory.bottom : undefined,
  ] as [number, number];

  return {
    xData,
    yData,
    lastPoint,
    maxHeightPoint,
  };
}
