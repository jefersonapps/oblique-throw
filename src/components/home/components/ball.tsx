import { useGlobalContext } from "@/contexts/global-context";

export function Ball() {
  const state = useGlobalContext();
  return (
    <div
      style={{
        left: 83 + state.ballPosition[0] * state.scale + 2.5 + "px",
        bottom: 65 + state.ballPosition[1] * state.scale + 2.5 + "px",
        zIndex: 20,
      }}
      data-showtext={state.selectedGravity === 0}
      className="absolute z-20 bottom-0 left-[92px] -translate-x-1/2 translate-y-1/2 size-4 bg-black rounded-full ring-zinc-400 ring-1 data-[showtext=true]:after:content-['Continua...'] after:absolute after:-translate-x-1/3 after:-translate-y-9 after:data-[showtext=true]:bg-white dark:data-[showtext=true]:after:bg-zinc-800 after:rounded-md after:px-2 after:py-1"
    ></div>
  );
}
