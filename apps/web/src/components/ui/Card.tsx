import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export default function Card({ hoverable = false, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={[
        "bg-white rounded-2xl overflow-hidden",
        hoverable ? "transition-shadow duration-200 hover:shadow-xl cursor-pointer" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
