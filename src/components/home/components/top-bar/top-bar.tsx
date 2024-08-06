import { CustomInput } from "@/components/custom-input";
import { ListSelector } from "@/components/list-selector";
import { Menu } from "@/components/menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/contexts/global-context";
import { FaEraser, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { useLaunch } from "./hooks/useLaunch";

export function TopBar() {
  const state = useGlobalContext();

  const { launch } = useLaunch();

  return (
    <div className="flex gap-2 items-center justify-center flex-wrap absolute top-4 left-0 right-0 z-50">
      <CustomInput
        type="number"
        label="Ângulo"
        value={state.angle}
        onChange={(value) => {
          if (value > 90 || value < 0) {
            console.log("Você digitou um ângulo maior que 90 ou menor que 0");
            state.setAngle(0);
            return;
          }
          state.setAngle(value);
        }}
        min={0}
        max={90}
      />

      <CustomInput
        value={state.velocity}
        type="number"
        label="Velocidade"
        onChange={(value) => state.setVelocity(value)}
      />

      <CustomInput
        value={state.range}
        type="number"
        label="Alcance"
        onChange={(value) => state.setRange(value)}
      />

      <div className="flex gap-2 items-center">
        <label className="font-bold">Gravidade:</label>
        <ListSelector
          planetName={state.planetName}
          setPlanetName={state.setPlanetName}
        />
      </div>

      <Button
        variant="default"
        className="bg-emerald-400 hover:bg-emerald-500 text-black"
        onClick={launch}
        disabled={state.isLaunching}
      >
        Lançar
      </Button>
      <ModeToggle />
      <Button
        onClick={() => {
          state.setTraceTrajectoryData([]);
          state.setAngle(0);
          state.setVelocity(0);
          state.setRange(0);
          state.setBallPosition([0, 0]);
          state.setMaxHeightPoint(null);
        }}
        variant="outline"
        size="icon"
      >
        <FaEraser size={20} />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={() => {
          state.setScale(state.scale + 1);
        }}
      >
        <FaSearchPlus size={20} />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={() => {
          state.setScale((prev) => (prev > 1 ? prev - 1 : prev));
        }}
      >
        <FaSearchMinus size={20} />
      </Button>
      <Menu />
    </div>
  );
}
