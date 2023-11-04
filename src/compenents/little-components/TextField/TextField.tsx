import { HTMLAttributes } from "react";
import "./index.less";

interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

export default function TextField({
  label,
  placeholder,
  ...props
}: TextFieldProps) {
  return (
    <div className="input-wrapper">
      <p>{label}</p>
      <input {...props} name={label} type="text" placeholder={placeholder} />
    </div>
  );
}
