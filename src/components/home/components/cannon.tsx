import cannonTube from "../../../assets/tube.png";
import cannonBase from "../../../assets/base.png";
import { useGlobalContext } from "@/contexts/global-context";
import { degreeToRadians } from "@/helpers/helpersFunctions";
import { CANNON_DISTANCE_FROM_LEFT } from "@/constants/constants";

export function Cannon() {
  const state = useGlobalContext();
  return (
    <>
      <div
        style={{
          transform: `rotate(${
            Math.PI / 2 - degreeToRadians(state.angle || Math.PI / 2)
          }rad)`,
          left: CANNON_DISTANCE_FROM_LEFT + "px",
        }}
        className="absolute bottom-16 bottom-center w-20 z-30 select-none"
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
