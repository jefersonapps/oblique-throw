import { useGlobalContext } from "@/contexts/global-context";

export function TrajectoryPath() {
  const state = useGlobalContext();
  return (
    <>
      {state.traceTrajetoryData.map((trace, index) => {
        return (
          <div
            key={index}
            className="absolute z-40 group bg-black w-2 h-[2px]"
            style={{
              bottom: 65 + trace.bottom * state.scale + "px",
              left: 83 + trace.left * state.scale + "px",
              transform: `rotate(${-trace.rotation}deg)`,
            }}
          ></div>
        );
      })}
    </>
  );
}
