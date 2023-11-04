import Button from "../little-components/Button/Button";
import TextField from "../little-components/TextField/TextField";
import "./index.less";

export default function LoginCard() {
  return (
    <form className="login-card">
      <div className="inputs">
        <TextField label="Login" />
        <TextField label="Senha" />
      </div>
      <div className="register">
        <p>Não tem conte? </p>
        <a href="">Cadratre-se</a>
      </div>
      <Button label="Entrar" variant="default" />
    </form>
  );
}
