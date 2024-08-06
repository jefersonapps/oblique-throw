import {
  EARTH_GRAVITY,
  MARS_GRAVITY,
  MOON_GRAVITY,
} from "@/constants/constants";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type Planets = "terra" | "lua" | "marte" | "vacuo";

type Angle = number | undefined;

type Velocity = number | undefined;

type Range = number | undefined;

type Point = [number, number];

type AnalyticHeight = number | null;

type TraceTrajetoryDataType = {
  left: number;
  bottom: number;
  rotation: number;
};

type BallPosition = [number, number];

interface GlobalContext {
  planetName: Planets;
  setPlanetName: Dispatch<SetStateAction<Planets>>;
  angle: Angle;
  setAngle: Dispatch<SetStateAction<Angle>>;
  velocity: Velocity;
  setVelocity: Dispatch<SetStateAction<Velocity>>;
  range: Range;
  setRange: Dispatch<SetStateAction<Range>>;
  maxHeightPoint: Point | null;
  setMaxHeightPoint: Dispatch<SetStateAction<Point | null>>;
  maxAnalyticHeight: AnalyticHeight;
  setMaxAnalyticHeight: Dispatch<SetStateAction<AnalyticHeight>>;
  traceTrajetoryData: TraceTrajetoryDataType[];
  setTraceTrajectoryData: Dispatch<SetStateAction<TraceTrajetoryDataType[]>>;
  isLaunching: boolean;
  setIsLaunching: Dispatch<SetStateAction<boolean>>;
  ballPosition: BallPosition;
  setBallPosition: Dispatch<SetStateAction<BallPosition>>;
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
  showGreeting: boolean;
  setShowGreeting: Dispatch<SetStateAction<boolean>>;
  selectedGravity: number;
  targetPosition: number;
}

const GlobalContext = createContext<GlobalContext>({} as GlobalContext);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("The Global Context should be used within an Provider");
  }
  return context;
}

export function GlobalContextProvider({ children }: { children: ReactNode }) {
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
  const [ballPosition, setBallPosition] = useState<BallPosition>([0, 0]);

  const [scale, setScale] = useState(10);

  const [showGreeting, setShowGreeting] = useState(false);

  const gravities = {
    terra: EARTH_GRAVITY,
    lua: MOON_GRAVITY,
    marte: MARS_GRAVITY,
    vacuo: 0,
  };

  const selectedGravity = gravities[planetName];

  const targetPosition = (range || 0) * scale + 20 + 150 / 2 - 80 / 2;

  return (
    <GlobalContext.Provider
      value={{
        planetName,
        setPlanetName,
        angle,
        setAngle,
        velocity,
        setVelocity,
        range,
        setRange,
        maxHeightPoint,
        setMaxHeightPoint,
        maxAnalyticHeight,
        setMaxAnalyticHeight,
        traceTrajetoryData,
        setTraceTrajectoryData,
        isLaunching,
        setIsLaunching,
        ballPosition,
        setBallPosition,
        scale,
        setScale,
        showGreeting,
        setShowGreeting,
        selectedGravity,
        targetPosition,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
