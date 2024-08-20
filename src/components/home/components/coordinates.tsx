export function Coordinates({ x, y }: { x: number; y: number }) {
  return (
    <div className="size-4 -translate-x-1/2 translate-y-1/2 cursor-pointer">
      <div className="hidden group-hover:flex bg-white dark:bg-zinc-950 w-fit rounded-md gap-2 px-2 py-1 items-center ml-4 -mt-8">
        <span className="flex gap-2">
          <span>y: </span> <span>{String(y.toFixed(2)).replace(".", ",")}</span>
        </span>

        <span className="flex gap-2">
          {" "}
          <span> x:</span> <span>{String(x.toFixed(2)).replace(".", ",")}</span>
        </span>
      </div>
    </div>
  );
}
