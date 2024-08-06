import { Point } from "@/components/home/home";
import cannon_shoot from "../assets/cannon-shoot.mp3";
import ball_hit from "../assets/object-hit.wav";

export function degreeToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function calculateComponents(angle: number, velocity: number) {
  const angleRad = angle;
  const velocityX = velocity * Math.cos(angleRad);
  const velocityY = velocity * Math.sin(angleRad);
  return { velocityX, velocityY };
}

export function calculateTrajectory(
  angle: number,
  velocity: number,
  selectedGravity: number
) {
  const { velocityX } = calculateComponents(angle, velocity);

  let t = 0;
  const trajectory = [];

  let stopCondition = true;
  let iterador = 0;

  while (stopCondition) {
    const x = velocityX * t;
    const y =
      x * Math.tan(angle) -
      (selectedGravity * Math.pow(x, 2)) /
        (2 * Math.pow(velocity, 2) * Math.pow(Math.cos(angle), 2));

    if (selectedGravity === 0) {
      if (iterador >= 120) {
        break;
      }
    }
    if (y < 0) {
      stopCondition = false;
      break;
    }

    const point = [x, y] as Point;

    trajectory.push(point);
    iterador += 1;
    t += 0.02;
  }

  return { trajectory };
}

export function playHitAudio() {
  const audio = new Audio(ball_hit);
  audio.play();
}

export function playShootAudio() {
  const audio = new Audio(cannon_shoot);
  audio.play();
}
