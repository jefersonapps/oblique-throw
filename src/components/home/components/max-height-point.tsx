import { useGlobalContext } from "@/contexts/global-context";

export function MaxHeightPoint() {
  const state = useGlobalContext();
  return (
    <>
      {state.maxHeightPoint && state.selectedGravity !== 0 && (
        <div
          className="relative size-4 flex items-center justify-center translate-y-[65%] z-50 group"
          style={{
            position: "absolute",
            bottom: 68 + state.maxHeightPoint[1] * state.scale + "px",
            left: 79 + state.maxHeightPoint[0] * state.scale + "px",
          }}
        >
          <div className="bg-orange-500 size-2 rounded-full ring-zinc-300 ring-1"></div>
          <span className="absolute z-50 -top-10 -translate-x-[25%] left-0 bg-white dark:bg-zinc-950 rounded-md px-2 py-1 hidden group-hover:flex">
            {String(state.maxAnalyticHeight?.toFixed(2)).replace(".", ",")}
          </span>
        </div>
      )}
    </>
  );
}
