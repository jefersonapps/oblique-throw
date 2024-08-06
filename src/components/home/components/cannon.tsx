import cannonTube from "../../../assets/tube.png";
import cannonBase from "../../../assets/base.png";
import { useGlobalContext } from "@/contexts/global-context";

export function Cannon() {
  const state = useGlobalContext();
  return (
    <>
      <div
        style={{ transform: `rotate(${90 - (state.angle || 90)}deg)` }}
        className="absolute bottom-16 left-[48px] bottom-center w-20 z-30 select-none"
      >
        <div className="w-full relative">
          <img
            src={cannonTube}
            alt="tubo canhão"
            className="-rotate-90 scale-150"
          />
        </div>
      </div>
      <div className="absolute bottom-[25px] left-[47px] w-[116px] bottom-center z-30 select-none">
        <img src={cannonBase} alt="base canhão" />
      </div>
    </>
  );
}
