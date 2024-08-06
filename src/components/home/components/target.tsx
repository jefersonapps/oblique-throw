import imagemAlvo from "../../../assets/target.png";

import { FaStar } from "react-icons/fa";

import { useGlobalContext } from "@/contexts/global-context";

export function Target() {
  const state = useGlobalContext();
  return (
    <div
      style={{ left: state.targetPosition + "px" }}
      className="absolute w-20 h-8 left-[132px] bottom-16 translate-y-1/2 z-10 flex items-center justify-center select-none"
    >
      <img src={imagemAlvo} alt="alvo" className="w-full h-full" />
      {state.showGreeting && (
        <div className="flex gap-2 absolute -top-5 left-8 text-orange-500 animate-pulse animate-stars">
          <FaStar size={20} />
          <FaStar size={20} />
          <FaStar size={20} />
        </div>
      )}
    </div>
  );
}
