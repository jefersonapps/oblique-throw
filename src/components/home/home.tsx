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

export type Planets = "terra" | "lua" | "marte" | "vacuo";

export type Point = [number, number];

export function Home() {
  const state = useGlobalContext();

  return (
    <div className="bg-gradient-to-b from-blue-600 to-white dark:from-blue-950 dark:to-white dark:bg-zinc-900 h-dvh w-full flex justify-center overflow-hidden">
      <Sky />

      <TopBar />

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
