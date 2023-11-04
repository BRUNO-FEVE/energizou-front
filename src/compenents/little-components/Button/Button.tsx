import { HTMLAttributes } from "react";
import "./index.less";

type variant = "disabled" | "default";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: variant;
}

export default function Button({ label, variant, ...props }: ButtonProps) {
  const variants: Record<variant, string> = {
    disabled: "disabled",
    default: "default",
  };

  const style = variants[variant];

  return (
    <button
      {...props}
      className={style}
      disabled={style === "disabled" ? true : false}
    >
      {label}
    </button>
  );
}
