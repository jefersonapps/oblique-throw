import { useGlobalContext } from "@/contexts/global-context";

export function Coordinates() {
  const state = useGlobalContext();
  return (
    <>
      {state.traceTrajetoryData.map((trace, index) => {
        return (
          <div
            key={index}
            className="absolute z-[999] group size-3 -translate-x-1/2 translate-y-1/2 cursor-pointer"
            style={{
              bottom: 65 + trace.bottom * state.scale + "px",
              left: 83 + trace.left * state.scale + "px",
            }}
          >
            <div className="hidden group-hover:flex bg-white dark:bg-zinc-950 w-fit rounded-md gap-2 px-2 py-1 items-center ml-4 -mt-8">
              <span className="flex gap-2">
                <span>y: </span>{" "}
                <span>{String(trace.bottom.toFixed(2)).replace(".", ",")}</span>
              </span>

              <span className="flex gap-2">
                {" "}
                <span> x:</span>{" "}
                <span>{String(trace.left.toFixed(2)).replace(".", ",")}</span>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
