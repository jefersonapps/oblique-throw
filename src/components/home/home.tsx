import { Sky } from "./components/sky";
import { TopBar } from "./components/top-bar/top-bar";
import { Cannon } from "./components/cannon";
import { Axes } from "./components/axes";
import { Ball } from "./components/ball";
import { TrajectoryPath } from "./components/trajectory-path";
import { Target } from "./components/target";
import { Floor } from "./components/floor";
import { LampPost } from "./components/lamp-post";
import { useGlobalContext } from "@/contexts/global-context";
import { Controls } from "./components/controls";
import { useState } from "react";
import { ChartWrapper } from "../charts/chart-wrapper";
import { useChart } from "./components/top-bar/hooks/useChart";

export type Planets =
  | "mercúrio"
  | "vênus"
  | "terra"
  | "lua"
  | "marte"
  | "jupiter"
  | "saturno"
  | "urano"
  | "netuno"
  | "vacuo";

export type Point = [number, number];

export function Home() {
  const state = useGlobalContext();

  const [index, setIndex] = useState<number>(-1);

  const { xData, yData, lastPoint, maxHeightPoint } = useChart({ index });

  return (
    <div className="relative bg-gradient-to-b from-blue-600 to-white dark:from-blue-950 dark:to-white dark:bg-zinc-900 h-dvh w-full max-w-screen flex justify-center overflow-hidden">
      <Sky />

      <TopBar setIndex={setIndex} />

      <ChartWrapper
        chart={{
          data1: [...xData, lastPoint[0]],
          data2: [...yData, lastPoint[1]],
        }}
        maxHeightPoint={maxHeightPoint}
      />

      <main
        className="w-full py-4 relative"
        style={{ marginLeft: `${state.marginLeft}px` }}
      >
        <Cannon />
        <Axes />
        <Ball />
        <TrajectoryPath />
        <Target />

        <Controls />
      </main>

      <Floor />
      <LampPost />
    </div>
  );
}
