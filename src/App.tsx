import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import "./App.css";
import cannoBase from "./assets/base.png";
import lightPost from "./assets/light-post.png";
import stars from "./assets/stars.png";
import imagemAlvo from "./assets/target.png";
import cannonTube from "./assets/tube.png";

import clouds from "./assets/clouds.png";
import { CustomInput } from "./components/CustomInput";
import { ListSelector } from "./components/ListSelector";
import { Button } from "./components/ui/button";
import {
  EARTH_GRAVITY,
  MARS_GRAVITY,
  MOON_GRAVITY,
} from "./constants/constants";

import { FaSearchMinus, FaSearchPlus, FaStar } from "react-icons/fa";
import { FaEraser } from "react-icons/fa6";

import { Menu } from "./components/Menu";
import { ModeToggle } from "./components/mode-toggle";
import {
  calculateTrajectory,
  degreeToRadians,
  playHitAudio,
  playShootAudio,
} from "./helpers/helpersFunctions";

export type Planets = "terra" | "lua" | "marte" | "vacuo";

export type Point = [number, number];

function App() {
  const [planetName, setPlanetName] = useState<Planets>("terra");
  const [angle, setAngle] = useState<number | undefined>(90);
  const [velocity, setVelocity] = useState<number | undefined>(0);
  const [range, setRange] = useState<number | undefined>(0);
  const [maxHeightPoint, setMaxHeightPoint] = useState<Point | null>(null);
  const [maxAnalyticHeight, setMaxAnalyticHeight] = useState<number | null>(
    null
  );
  const [traceTrajetoryData, setTraceTrajectoryData] = useState<
    TraceTrajetoryDataType[]
  >([]);

  const [isLaunching, setIsLaunching] = useState(false);
  const [ballPosition, setBallPosition] = useState([0, 0, 0, 0]);

  const [scale, setScale] = useState(10);

  const [showGreeting, setShowGreeting] = useState(false);

  const gravities = {
    terra: EARTH_GRAVITY,
    lua: MOON_GRAVITY,
    marte: MARS_GRAVITY,
    vacuo: 0,
  };

  const selectedGravity = gravities[planetName];

  type TraceTrajetoryDataType = {
    left: number;
    bottom: number;
    rotation: number;
  };

  const targetPosition = (range || 0) * scale + 20 + 150 / 2 - 80 / 2;

  function launch() {
    console.log("chegou aqui");
    if (!velocity || !angle) return;
    if (velocity <= 0) return;
    setIsLaunching(true);

    let intervalId: string | number | NodeJS.Timeout | undefined;

    const convertedAngle = degreeToRadians(angle);
    const { trajectory } = calculateTrajectory(
      convertedAngle,
      velocity,
      selectedGravity
    );

    let i = 0;
    let previousX = 0;
    let previousY = 0;
    let previousT = 0;

    //play no audio de cannon-shoot
    playShootAudio();
    intervalId = setInterval(function animate() {
      if (i < trajectory.length) {
        const [x, y] = trajectory[i];
        updatePosition(x, y);

        if (i - previousT > 5) {
          previousT = i; // Atualiza o tempo anterior
          const angleInRadians = Math.atan((y - previousY) / (x - previousX));
          const angleInDegrees = angleInRadians * (180 / Math.PI);
          const trace: TraceTrajetoryDataType = {
            bottom: y,
            left: x,
            rotation: angleInDegrees,
          };
          setTraceTrajectoryData((prev) => [...prev, trace]);
        }

        previousX = x;
        previousY = y;
        i++;
      } else {
        // Finalizou
        clearInterval(intervalId);
        intervalId = undefined;
        previousT = 0;
        playHitAudio();
        const maxHeightPoint = trajectory.reduce(function (prev, current) {
          return prev[1] > current[1] ? prev : current;
        });
        setMaxHeightPoint(maxHeightPoint);

        const analyticHeight =
          Math.pow(velocity * Math.sin(angle), 2) / (2 * selectedGravity);
        setMaxAnalyticHeight(analyticHeight);
        setIsLaunching(false);

        const targetStart = targetPosition;
        const targetEnd = targetPosition + 80;
        const ballLastX = trajectory[trajectory.length - 1][0];
        const delta = 83 + ballLastX * scale + 2.5;

        if (
          ballLastX + delta >= targetStart &&
          ballLastX + delta <= targetEnd
        ) {
          setShowGreeting(true);
          setTimeout(() => {
            setShowGreeting(false);
          }, 1000 * 2);
        } else {
          setShowGreeting(false);
        }
      }
    }, 20);
  }

  function updatePosition(x: number, y: number) {
    setBallPosition([x, y]);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-gradient-to-b from-blue-600 to-white dark:from-blue-950 dark:to-white dark:bg-zinc-900 h-dvh w-full flex justify-center overflow-hidden">
        {/* Estrelas */}
        <div className="w-full absolute z-0 top-0 h-48 hidden dark:flex overflow-hidden select-none">
          <img
            src={stars}
            alt="estrelas"
            className="w-full h-full object-cover animate-pulse"
          />
        </div>
        <div className="w-full absolute z-0 top-10 h-48 flex dark:hidden overflow-hidden select-none">
          <div className="w-full h-full flex gap-2 relative overflow-hidden">
            <img
              src={clouds}
              alt="nuvens"
              className="absolute top-0 left-0 h-full animate-clouds"
            />
          </div>
        </div>

        <main className="w-full max-w-7xl py-4 relative">
          <div className="flex gap-2 items-center justify-center flex-wrap absolute top-4 left-0 right-0 z-50">
            <CustomInput
              type="number"
              label="Ângulo"
              value={angle}
              onChange={(value) => {
                if (value > 90 || value < 0) {
                  console.log(
                    "Você digitou um ângulo maior que 90 ou menor que 0"
                  );
                  setAngle(0);
                  return;
                }
                setAngle(value);
              }}
              min={0}
              max={90}
            />

            <CustomInput
              value={velocity}
              type="number"
              label="Velocidade"
              onChange={(value) => setVelocity(value)}
            />

            <CustomInput
              value={range}
              type="number"
              label="Alcance"
              onChange={(value) => setRange(value)}
            />

            <div className="flex gap-2 items-center">
              <label className="font-bold">Gravidade:</label>
              <ListSelector
                planetName={planetName}
                setPlanetName={setPlanetName}
              />
            </div>

            <Button
              variant="default"
              className="bg-emerald-400 hover:bg-emerald-500 text-black"
              onClick={launch}
              disabled={isLaunching}
            >
              Lançar
            </Button>
            <ModeToggle />
            <Button
              onClick={() => {
                setTraceTrajectoryData([]);
                setAngle(0);
                setVelocity(0);
                setRange(0);
                setBallPosition([0, 0]);
                setMaxHeightPoint(null);
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
                setScale(scale + 1);
              }}
            >
              <FaSearchPlus size={20} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setScale((prev) => (prev > 1 ? prev - 1 : prev));
              }}
            >
              <FaSearchMinus size={20} />
            </Button>
            <Menu />
          </div>

          {/* Canhão */}
          <div
            style={{ transform: `rotate(${90 - (angle || 90)}deg)` }}
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

          {/* Base do canhão */}
          <div className="absolute bottom-[25px] left-[47px] w-[116px] bottom-center z-30 select-none">
            <img src={cannoBase} alt="base canhão" />
          </div>
          {/* Eixos */}
          <div className="absolute -bottom-3 left-[61px] w-12 h-20 z-30 x-axes y-axes"></div>

          {/* Bola */}
          <div
            style={{
              left: 83 + ballPosition[0] * scale + 2.5 + "px",
              bottom: 65 + ballPosition[1] * scale + 2.5 + "px",
              zIndex: 20,
            }}
            data-showtext={selectedGravity === 0}
            className="absolute z-20 bottom-0 left-[92px] -translate-x-1/2 translate-y-1/2 size-4 bg-black rounded-full ring-zinc-400 ring-1 data-[showtext=true]:after:content-['Continua...'] after:absolute after:-translate-x-1/3 after:-translate-y-9 after:data-[showtext=true]:bg-white dark:data-[showtext=true]:after:bg-zinc-800 after:rounded-md after:px-2 after:py-1"
          ></div>

          {/* Traços */}
          {traceTrajetoryData.map((trace, index) => {
            return (
              <div
                key={index}
                className="absolute z-40 group bg-black w-2 h-[2px]"
                style={{
                  bottom: 65 + trace.bottom * scale + "px",
                  left: 83 + trace.left * scale + "px",
                  transform: `rotate(${-trace.rotation}deg)`,
                }}
              ></div>
            );
          })}

          {traceTrajetoryData.map((trace, index) => {
            return (
              <div
                key={index}
                className="absolute z-50 group size-3 -translate-x-1/2 translate-y-1/2"
                style={{
                  bottom: 65 + trace.bottom * scale + "px",
                  left: 83 + trace.left * scale + "px",
                }}
              >
                <div className="hidden group-hover:flex bg-white dark:bg-zinc-950 w-fit rounded-md gap-2 px-2 py-1 items-center">
                  <span className="flex gap-2">
                    <span>y: </span>{" "}
                    <span>
                      {String(trace.bottom.toFixed(2)).replace(".", ",")}
                    </span>
                  </span>

                  <span className="flex gap-2">
                    {" "}
                    <span> x:</span>{" "}
                    <span>
                      {String(trace.left.toFixed(2)).replace(".", ",")}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}

          {maxHeightPoint && selectedGravity !== 0 && (
            <div
              className="relative size-4 flex items-center justify-center translate-y-[65%] z-50 group"
              style={{
                position: "absolute",
                bottom: 68 + maxHeightPoint[1] * scale + "px",
                left: 79 + maxHeightPoint[0] * scale + "px",
              }}
            >
              <div className="bg-orange-500 size-2 rounded-full ring-zinc-300 ring-1"></div>
              <span className="absolute z-50 -top-10 -translate-x-[25%] left-0 bg-white dark:bg-zinc-950 rounded-md px-2 py-1 hidden group-hover:flex">
                {String(maxAnalyticHeight?.toFixed(2)).replace(".", ",")}
              </span>
            </div>
          )}

          {/* Alvo */}
          <div
            style={{ left: targetPosition + "px" }}
            className="absolute w-20 h-8 left-[132px] bottom-16 translate-y-1/2 z-10 flex items-center justify-center select-none"
          >
            <img src={imagemAlvo} alt="alvo" className="w-full h-full" />
            {showGreeting && (
              <div className="flex gap-2 absolute -top-5 left-8 text-orange-500 animate-pulse animate-stars">
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
              </div>
            )}
          </div>

          {/* Chão */}
        </main>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-green-700 dark:bg-green-900 z-[1] pt-4">
          <div className="w-full h-20 bg-orange-900 dark:bg-orange-950 mt-7 flex items-center -translate-y-4">
            <div className="flex w-full h-2 justify-evenly">
              {Array.from({ length: 30 }).map((_, index) => {
                return <div key={index} className="w-5 h-1 bg-white" />;
              })}
            </div>
          </div>
        </div>
        {/* Poste */}
        <div className="absolute z-0 right-28 bottom-0 opacity-0 dark:bottom-24 dark:opacity-100 transition-all select-none">
          <img src={lightPost} alt="poste" className="h-60" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
