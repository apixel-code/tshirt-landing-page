import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={[
          "w-full px-4 py-3 rounded-2xl border bg-white text-zinc-900",
          "placeholder-zinc-400 outline-none transition-colors duration-150",
          "focus:ring-2 focus:ring-accent/30 focus:border-accent",
          error ? "border-red-400" : "border-zinc-200 hover:border-zinc-300",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";
export default Input;
