import { cn } from "@/lib/utils";

interface Props {
  variant: "dark" | "light";
  size: "small" | "medium" | "large";
}

const Icon = ({ size = "medium", variant }: Props) => {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill={variant === "dark" ? "#ffffff" : "#000000"}
        viewBox="0 0 32 32"
        className={cn(
          "flex items-center justify-center gap-2",
          size === "small" && "w-16 h-16",
          size === "medium" && "w-28 h-28",
          size === "large" && "w-40 h-40",
        )}
      >
        <g
          className="w-full h-full"
          fill="inherit"
          clipPath="url(#clip0_2203_3)"
        >
          <path d="m28.811 30.5-4.33-2.5.359-.623 4.33 2.5zm-25.621 0-.36-.623 4.33-2.5.36.623zM31 23.048h-5v-.72h5zm-25 0H1v-.72h5zM7.16 18l-4.33-2.5.36-.624 4.33 2.5zm14.152-3.792-.623-.36 2.5-4.33.623.36zm-10.624 0-2.5-4.33.624-.36 2.5 4.33zm5.672-1.52h-.72v-5h.72zM24.901 17.395l4.323-2.768.386.603L25.288 18z"></path>
        </g>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill={variant === "dark" ? "#ffffff" : "#000000"}
        viewBox="0 0 32 32"
        className={cn(
          "flex items-center justify-center gap-2 absolute top-0 left-0",
          size === "small" && "w-16 h-16",
          size === "medium" && "w-28 h-28",
          size === "large" && "w-40 h-40",
        )}
      >
        <path
          fill="inherit"
          d="M16.145 23.18 3.213 30.342l-.347-.627 12.932-7.163z"
          className="animate-needle-spin"
          style={{
            transformOrigin: "16.5px 22.7px",
          }}
        ></path>
      </svg>
    </div>
  );
};

export default Icon;
