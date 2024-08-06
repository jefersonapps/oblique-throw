import stars from "../../../assets/stars.png";
import clouds from "../../../assets/clouds.png";

export function Sky() {
  return (
    <>
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
    </>
  );
}
