import { ButtonHTMLAttributes, ReactElement } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

type variant = "disabled" | "default" | "outline";
type color = "blue" | "yellow" | "red";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: variant;
  color?: color;
}

function Button({ variant, color, children, ...props }: ButtonProps) {
  const variants: Record<variant, string> = {
    disabled: "disabled",
    default: "default",
    outline: "outline",
  };

  const buttonColor = color ? color : "blue";
  const style = `${variants[variant]} ${buttonColor} ${props.className}`;

  return (
    <button
      {...props}
      className={style}
      disabled={style === "disabled" ? true : false}
    >
      {children}
    </button>
  );
}

interface NavButtonProps extends React.RefAttributes<HTMLAnchorElement> {
  endpoint: string;
  children: ReactElement;
}

function NavButton({ endpoint, children, ...props }: NavButtonProps) {
  return (
    <Link {...props} to={endpoint} className="nav-button">
      {children}
    </Link>
  );
}

interface GoBackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  endpoint: string;
}

function GoBackButton({ endpoint, ...props }: GoBackButtonProps) {
  return (
    <Link to={endpoint} className="back-button">
      <button {...props} className="outline blue">
        <BsFillArrowLeftCircleFill />
        Voltar
      </button>
    </Link>
  );
}

export { Button, NavButton, GoBackButton };
