import lightPost from "../../../assets/light-post.png";

export function LampPost() {
  return (
    <div className="absolute z-0 right-28 bottom-0 opacity-0 dark:bottom-24 dark:opacity-100 transition-all select-none">
      <img src={lightPost} alt="poste" className="h-60" />
    </div>
  );
}
