import { TrajectoryPoint, useGlobalContext } from "@/contexts/global-context";
import {
  calculateTrajectory,
  degreeToRadians,
  playHitAudio,
  playShootAudio,
} from "@/helpers/helpersFunctions";
import { v4 as uuidV4 } from "uuid";

export function useLaunch() {
  const state = useGlobalContext();

  function updatePosition(x: number, y: number) {
    state.setBallPosition([x, y]);
  }

  async function launch() {
    const id = uuidV4();

    handleLaunch(id);
  }

  function handleLaunch(id: string) {
    if (!state.velocity || !state.angle || state.velocity <= 0) return;

    state.setIsLaunching(true);

    let intervalId: string | number | NodeJS.Timeout | undefined;

    const angleInRad = degreeToRadians(state.angle);

    const { trajectory } = calculateTrajectory(
      angleInRad,
      state.velocity,
      state.selectedGravity
    );

    let i = 0;
    let previousT = 0;

    playShootAudio();

    // Inicializa a trajetória no estado global
    state.setLaunchTrajectoriesData((prev) => [
      ...prev,
      { id, data: [{ bottom: 0, left: 0 }] },
    ]);

    intervalId = setInterval(function animate() {
      if (i < trajectory.length) {
        const [x, y] = trajectory[i];
        updatePosition(x, y);

        if (i - previousT > 5 || i === trajectory.length - 2) {
          previousT = i;
          const point: TrajectoryPoint = {
            bottom: y,
            left: x,
          };

          // Atualiza o estado global diretamente
          state.setLaunchTrajectoriesData((prev) =>
            prev.map((trajectoryData) =>
              trajectoryData.id === id
                ? {
                    ...trajectoryData,
                    data: [...trajectoryData.data, point],
                  }
                : trajectoryData
            )
          );
        }

        i++;
      } else {
        clearInterval(intervalId);
        intervalId = undefined;
        previousT = 0;
        playHitAudio();

        // const maxHeightPoint = trajectory.reduce((prev, current) =>
        //   prev[1] > current[1] ? prev : current
        // );
        // state.setMaxHeightPoint(maxHeightPoint);

        // const analyticHeight =
        //   state.velocity && state.angle
        //     ? Math.pow(state.velocity * Math.sin(state.angle), 2) /
        //       (2 * state.selectedGravity)
        //     : 0;
        // state.setMaxAnalyticHeight(analyticHeight);
        state.setIsLaunching(false);

        const ballLastX = trajectory[trajectory.length - 1][0];
        const delta = 83 + ballLastX * state.scale + 2.5;

        if (
          ballLastX + delta >= state.targetPosition &&
          ballLastX + delta <= state.targetPosition
        ) {
          state.setShowGreeting(true);
          setTimeout(() => {
            state.setShowGreeting(false);
          }, 2000);
        } else {
          state.setShowGreeting(false);
        }
      }
    }, 20);
  }

  return { launch };
}
