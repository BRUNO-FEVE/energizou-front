import { ButtonHTMLAttributes } from "react";
import "./index.less";

type variant = "disabled" | "default";
type color = "blue" | "yellow";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: variant;
  color?: color;
}

export default function Button({
  label,
  variant,
  color,
  ...props
}: ButtonProps) {
  const variants: Record<variant, string> = {
    disabled: "disabled",
    default: "default",
  };

  const buttonColor = color ? color : "blue";
  const style = `${variants[variant]} ${buttonColor}`;

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
