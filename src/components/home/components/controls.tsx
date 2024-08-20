import { useGlobalContext } from "@/contexts/global-context";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

export function Controls() {
  const state = useGlobalContext();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const incresseMargin = () => {
    state.setMarginLeft((prevMargin) => prevMargin + 10);
  };
  const decresseMargin = () => {
    state.setMarginLeft((prevMargin) => prevMargin - 10);
  };

  const startIncrease = () => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      incresseMargin();
    }, 100);
  };

  const startDecrease = () => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      decresseMargin();
    }, 100);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 select-none">
      <button
        className="bg-card px-3 py-1 rounded-full"
        onMouseDown={startIncrease}
        onMouseUp={stopInterval}
        onMouseLeave={stopInterval}
        onTouchStart={startIncrease}
        onTouchEnd={stopInterval}
        onClick={incresseMargin}
      >
        <ArrowLeft />
      </button>
      <button
        className="bg-card px-3 py-1 rounded-full"
        onMouseDown={startDecrease}
        onMouseUp={stopInterval}
        onMouseLeave={stopInterval}
        onTouchStart={startDecrease}
        onTouchEnd={stopInterval}
        onClick={decresseMargin}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
