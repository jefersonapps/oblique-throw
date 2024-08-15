import { useGlobalContext } from "@/contexts/global-context";

export function TrajectoryPath() {
  const state = useGlobalContext();
  console.log(state.traceTrajetoryData);
  return (
    <>
      {state.traceTrajetoryData.map((trace, index) => {
        return (
          <div
            key={index}
            className="absolute z-40 group bg-black size-[4.5px] rounded-full ring-white ring-1"
            style={{
              bottom: 65 + trace.bottom * state.scale + "px",
              left: 83 + trace.left * state.scale + "px",
              transform: `rotate(${-trace.rotation}rad)`,
            }}
          ></div>
        );
      })}
    </>
  );
}
