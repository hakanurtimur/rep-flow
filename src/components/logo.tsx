import { cn } from "@/lib/utils";

interface Props {
  variant: "dark" | "light";
  size: "small" | "medium" | "large";
}

const Logo = ({ size = "medium", variant }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        size === "small" && "w-16",
        size === "medium" && "w-28",
        size === "large" && "w-40",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        id="Layer_1"
        fill={variant === "dark" ? "#ffffff" : "#000000"}
        version="1.1"
        viewBox="0 0 32 32"
      >
        <path
          id="speedometer_1_"
          fill="inherit"
          d="m28.811 26.812-4.33-2.5.359-.623 4.33 2.5zm-25.621 0-.36-.623 4.33-2.5.36.623zM31 19.36h-5v-.72h5zm-25 0H1v-.72h5zm10.18-.048-.359-.623 13-7.5.359.624zm-9.02-5-4.33-2.5.36-.624 4.33 2.5zm14.152-3.792-.623-.36 2.5-4.33.623.36zm-10.624 0-2.5-4.33.624-.36 2.5 4.33zM16.36 9h-.72V4h.72z"
        ></path>
        <path id="_Transparent_Rectangle" fill="none" d="M0 0h32v32H0z"></path>
      </svg>
      <span
        className={cn(
          size === "small"
            ? "text-base"
            : size === "medium"
              ? "text-lg"
              : "text-xl",
          variant === "dark" ? "text-white" : "text-black",
        )}
      >
        RepFlow
      </span>
    </div>
  );
};

export default Logo;
