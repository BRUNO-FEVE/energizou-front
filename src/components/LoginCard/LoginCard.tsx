import { Link, Navigate, redirect } from "react-router-dom";
import Button from "../little-components/Button/Button";
import TextField from "../little-components/TextField/TextField";
import "./index.less";
import axios from "axios";
import { ChangeEvent, useContext, useState } from "react";
import { EntitiesContext } from "../../context/entitiesContext";

export default function LoginCard() {
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const { setUser, user } = useContext(EntitiesContext);

  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    await axios
      .post(`http://localhost:3000/login/${userLogin.username}`, {
        password: userLogin.password,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          return redirect("/register");
        } else {
          // setErrorMessage(res.data.error);
        }
      });
  };

  if (user) {
    return <Navigate to={"/home"} />;
  }

  return (
    <form className="login-card">
      <div className="inputs">
        <TextField
          label="Email"
          name="username"
          value={userLogin.username}
          onChange={onFormChange}
          variant="default"
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          value={userLogin.password}
          onChange={onFormChange}
          variant="default"
        />
      </div>
      <div className="register">
        <p>Não tem conte? </p>
        <Link to={"/register"}>Cadrastre-se</Link>
      </div>
      <Button
        type="button"
        label="Entrar"
        variant="default"
        onClick={handleClick}
      />
    </form>
  );
}
