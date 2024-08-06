import { Sky } from "./components/sky";
import { TopBar } from "./components/top-bar/top-bar";
import { Cannon } from "./components/cannon";
import { Axes } from "./components/axes";
import { Ball } from "./components/ball";
import { TrajectoryPath } from "./components/trajectory-path";
import { Coordinates } from "./components/coordinates";
import { MaxHeightPoint } from "./components/max-height-point";
import { Target } from "./components/target";
import { Floor } from "./components/floor";
import { LampPost } from "./components/lamp-post";

export type Planets = "terra" | "lua" | "marte" | "vacuo";

export type Point = [number, number];

export function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-white dark:from-blue-950 dark:to-white dark:bg-zinc-900 h-dvh w-full flex justify-center overflow-hidden">
      <Sky />

      <main className="w-full max-w-7xl py-4 relative">
        <TopBar />

        <Cannon />

        <Axes />

        <Ball />

        <TrajectoryPath />

        <Coordinates />

        <MaxHeightPoint />

        <Target />
      </main>
      <Floor />
      <LampPost />
    </div>
  );
}
