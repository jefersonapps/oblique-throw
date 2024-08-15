import { useGlobalContext } from "@/contexts/global-context";
import {
  calculateTrajectory,
  degreeToRadians,
  playHitAudio,
  playShootAudio,
} from "@/helpers/helpersFunctions";

type TraceTrajetoryDataType = {
  left: number;
  bottom: number;
  rotation: number;
};

export function useLaunch() {
  const state = useGlobalContext();
  function updatePosition(x: number, y: number) {
    state.setBallPosition([x, y]);
  }

  function launch() {
    if (!state.velocity || !state.angle || state.velocity <= 0) return;

    state.setIsLaunching(true);

    let intervalId: string | number | NodeJS.Timeout | undefined;

    const angleInRad = degreeToRadians(state.angle);

    const { trajectory } = calculateTrajectory(
      angleInRad,
      state.velocity,
      state.selectedGravity
    );
    console.log(trajectory);

    let i = 0;
    let previousX = 0;
    let previousY = 0;
    let previousT = 0;

    playShootAudio();
    intervalId = setInterval(function animate() {
      if (i < trajectory.length) {
        const [x, y] = trajectory[i];
        updatePosition(x, y);

        if (i - previousT > 5) {
          previousT = i;
          const angleInRadians = Math.atan((y - previousY) / (x - previousX));
          const trace: TraceTrajetoryDataType = {
            bottom: y,
            left: x,
            rotation: angleInRadians,
          };
          state.setTraceTrajectoryData((prev) => [...prev, trace]);
        }

        previousX = x;
        previousY = y;
        i++;
      } else {
        clearInterval(intervalId);
        intervalId = undefined;
        previousT = 0;
        playHitAudio();
        const maxHeightPoint = trajectory.reduce(function (prev, current) {
          return prev[1] > current[1] ? prev : current;
        });
        state.setMaxHeightPoint(maxHeightPoint);

        const analyticHeight =
          state.velocity && state.angle
            ? Math.pow(state.velocity * Math.sin(state.angle), 2) /
              (2 * state.selectedGravity)
            : 0;
        state.setMaxAnalyticHeight(analyticHeight);
        state.setIsLaunching(false);

        const targetStart = state.targetPosition;
        const targetEnd = state.targetPosition;
        const ballLastX = trajectory[trajectory.length - 1][0];
        const delta = 83 + ballLastX * state.scale + 2.5;

        if (
          ballLastX + delta >= targetStart &&
          ballLastX + delta <= targetEnd
        ) {
          state.setShowGreeting(true);
          setTimeout(() => {
            state.setShowGreeting(false);
          }, 1000 * 2);
        } else {
          state.setShowGreeting(false);
        }
      }
    }, 20);
  }

  return { launch };
}
