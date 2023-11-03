import "./LoginPage.less";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="text-filed">
        <p>Login: </p>
        <input type="text" />
      </div>
      <div className="text-filed">
        <p>Senha: </p>
        <input type="text" />
      </div>
      <div>
        <p>Não tem conte? </p>
        <a href="">Cadratre-se</a>
      </div>
    </div>
  );
}
