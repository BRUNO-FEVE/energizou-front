import "./index.less";
import "react-toastify/dist/ReactToastify.css";
import TextField from "../../components/little-components/TextField/TextField";
import {
  Button,
  GoBackButton,
} from "../../components/little-components/Button/Button";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/energizou-logo.png";
import { ToastContainer, toast } from "react-toastify";
import { ToastProps } from "../../components/little-components/Toast/Toast";
import { Navigate } from "react-router-dom";

export default function ResgisterPage() {
  const [status, setStatus] = useState<number | null>();
  const [navigate, setNavigate] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubimit = async () => {
    if (userData.password === userData.passwordConfirm) {
      const response = await axios.post("http://localhost:3000/user", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      if (response) {
        setStatus(response.status);
        if (response.status === 201) {
          toast.info("Usuario Criado!", ToastProps);
        } else {
          toast.info("Error ao Criar Usuario", ToastProps);
        }
      }
    } else {
      toast.info("Senhas não se correspondem", ToastProps);
    }
  };

  useEffect(() => {
    if (status === 201) {
      const timer = setTimeout(() => {
        setNavigate(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  if (navigate) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="form-wrapper">
      <GoBackButton endpoint="/" />
      <div className="logo">
        <img src={logo} alt="Energizou Logo" />
      </div>
      <div>
        <h1>Crie sua conta</h1>
        <TextField
          name="name"
          label="Nome Completo:"
          variant={"default"}
          onChange={onFormChange}
        />
        <TextField
          name="email"
          label="Email:"
          variant={"default"}
          onChange={onFormChange}
        />
        <TextField
          name="password"
          type="password"
          label="Senha:"
          variant={"default"}
          onChange={onFormChange}
        />
        <TextField
          type="password"
          name="passwordConfirm"
          label="Confirme a senha:"
          variant={"default"}
          onChange={onFormChange}
        />
        <Button variant="default" onClick={handleFormSubimit}>
          Cadrastre-se
        </Button>
        <ToastContainer icon={false} closeButton={false} />
      </div>
    </div>
  );
}
