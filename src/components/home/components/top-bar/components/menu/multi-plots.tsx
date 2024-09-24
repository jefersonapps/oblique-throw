import { ChartCardComponent } from "@/components/charts/chart-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGlobalContext } from "@/contexts/global-context";
import { ChartLineUp } from "phosphor-react";

export function MultiPlots() {
  const state = useGlobalContext();
  const multiplot = state.launchTrajectoriesData.map((trajectory, index) => {
    const maxHeightPoint = trajectory.data.reduce((prev, current) =>
      prev.bottom > current.bottom ? prev : current
    );

    return {
      x: trajectory.data.map((point) => point.left),
      y: trajectory.data.map((point) => point.bottom),
      color: `hsl(${
        (index * 360) / state.launchTrajectoriesData.length
      }, 100%, 50%)`,
      maxHeightPoint: [maxHeightPoint.left, maxHeightPoint.bottom] as [
        number,
        number
      ],
    };
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-start gap-2 text-primary w-full px-2 border-none"
        >
          <ChartLineUp size={20} weight="bold" /> Gráficos
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-5xl h-4/5 px-2">
        <DialogHeader>
          <DialogTitle>Lançamentos</DialogTitle>
        </DialogHeader>
        <div>
          <ChartCardComponent
            multiplot={multiplot}
            graficoConfig={{
              eixos: ["x", "y"],
              titulo: "Gráfico dos lançamentos",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
