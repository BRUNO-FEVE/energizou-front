import "./LoginPage.less";
import logo from "../../assets/energizou-logo.png";
import LoginCard from "../../compenents/LoginCard/LoginCard";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="logo-wrapper">
        <img src={logo} alt="Energizou Logo" />
        <p>Faça o login para continuar</p>
      </div>
      <LoginCard />
    </div>
  );
}
