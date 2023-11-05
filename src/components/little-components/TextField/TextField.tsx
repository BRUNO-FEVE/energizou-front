import { InputHTMLAttributes } from "react";
import "./index.less";

type variant = "default" | "single" | "edit-form";
type text = "h1" | "p";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  variant: variant;
  text?: text;
}

export default function TextField({
  label,
  placeholder,
  variant,
  text,
  ...props
}: TextFieldProps) {
  const textClass = text ? text : "p";
  const disableClass = props.disabled ? "disabled" : null;
  return (
    <div className="input-wrapper">
      {variant === "default" ? <p>{label}</p> : null}
      <input
        {...props}
        placeholder={placeholder}
        className={`${variant} ${textClass} ${disableClass}`}
        disabled={props.disabled}
      />
    </div>
  );
}
