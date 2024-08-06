export function Floor() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-32 bg-green-700 dark:bg-green-900 z-[1] pt-4">
      <div className="w-full h-20 bg-orange-900 dark:bg-orange-950 mt-7 flex items-center -translate-y-4">
        <div className="flex w-full h-2 justify-evenly">
          {Array.from({ length: 30 }).map((_, index) => {
            return <div key={index} className="w-5 h-1 bg-white" />;
          })}
        </div>
      </div>
    </div>
  );
}
