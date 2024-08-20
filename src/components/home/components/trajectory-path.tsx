import {
  TrajectoryDataType,
  useGlobalContext,
} from "@/contexts/global-context";
import { Coordinates } from "./coordinates";

export function TrajectoryPath() {
  const state = useGlobalContext();

  return (
    <>
      {state.launchTrajectoriesData &&
        state.launchTrajectoriesData.map((launch) => {
          return <RenderTrajectory key={launch.id} launch={launch} />;
        })}
    </>
  );
}

function RenderTrajectory({ launch }: { launch: TrajectoryDataType }) {
  const state = useGlobalContext();

  const maxHeightPoint = launch.data.reduce((prev, current) =>
    prev.bottom > current.bottom ? prev : current
  );

  const displacement = launch.data.reduce((prev, current) =>
    prev.left > current.left ? prev : current
  );

  return (
    <>
      <svg
        className="absolute z-30 -scale-y-100"
        width={88 + displacement.left * state.scale}
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <polyline
          points={launch.data
            .map(
              (point) =>
                `${88 + point.left * state.scale},${
                  83 + point.bottom * state.scale
                }`
            )
            .join(" ")}
          fill="none"
          stroke="blue"
          strokeWidth="2"
        />
        {launch.data.map((point, index) => {
          return (
            <circle
              key={index}
              cx={88 + point.left * state.scale}
              cy={83 + point.bottom * state.scale}
              r="2.25"
              fill="black"
              className="group bg-black size-[4.5px] rounded-full ring-white ring-1"
            />
          );
        })}

        {maxHeightPoint && state.selectedGravity !== 0 && (
          <circle
            cx={88 + maxHeightPoint.left * state.scale}
            cy={83 + maxHeightPoint.bottom * state.scale}
            r="3"
            fill="orange"
            className="group bg-orange-500 size-[5px] rounded-full ring-white ring-1"
          />
        )}
      </svg>

      {state.launchTrajectoriesData.map((trajectory) => {
        return (
          <>
            {trajectory.data.map((point, index) => {
              return (
                <div
                  key={index}
                  className="absolute z-[9999] group"
                  style={{
                    left: 85 - 8 + point.left * state.scale + "px",
                    bottom: 65 - 8 + point.bottom * state.scale + "px",
                  }}
                >
                  <Coordinates x={point.left} y={point.bottom} />
                </div>
              );
            })}
          </>
        );
      })}

      {state.launchTrajectoriesData &&
        state.launchTrajectoriesData.map((launch, index) => {
          const maxHeightPoint = launch.data.reduce((prev, current) =>
            prev.bottom > current.bottom ? prev : current
          );

          return (
            <>
              <div
                key={index}
                className=" group absolute z-[999999]"
                style={{
                  left: 88 - 8 + maxHeightPoint.left * state.scale + "px",
                  bottom: 65 - 8 + maxHeightPoint.bottom * state.scale + "px",
                }}
              >
                <Coordinates
                  x={maxHeightPoint.left}
                  y={maxHeightPoint.bottom}
                />
              </div>
            </>
          );
        })}
    </>
  );
}
