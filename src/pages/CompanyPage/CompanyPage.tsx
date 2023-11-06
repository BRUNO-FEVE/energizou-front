import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./index.less";
import { EntitiesContext } from "../../context/entitiesContext";
import { BsFillBuildingFill } from "react-icons/bs";
import TextField from "../../components/little-components/TextField/TextField";
import axios from "axios";
import {
  Button,
  GoBackButton,
} from "../../components/little-components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import { ToastProps } from "../../components/little-components/Toast/Toast";

const CEP_LENGTH = 8;

type variant = "create" | "update";

interface CompanyPageProps {
  variant: variant;
}

export default function CompanyPage({ variant }: CompanyPageProps) {
  const { company, setCompany, user } = useContext(EntitiesContext);
  const [isEditable, setIsEditable] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({
    name: "",
    cnpj: "",
    address: "",
    address_number: "",
    cep: "",
    phone: "",
  });

  const handleEditButton = () => {
    setIsEditable((prev) => !prev);
  };

  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepCompletion = async () => {
    const cepAddress = await axios.get(
      `http://viacep.com.br/ws/${currentCompany.cep}/json/`
    );

    console.log(cepAddress);

    setCurrentCompany((prev) => ({
      ...prev,
      address: cepAddress.data.logradouro,
    }));
  };

  const handleUpdate = async () => {
    const companyUpdated = await axios.put(
      `http://localhost:3000/user/${user?.id}/company/${company?.cnpj}`,
      {
        cnpj: currentCompany.cnpj,
        name: currentCompany.name,
        cep: currentCompany.cep,
        address: currentCompany.address,
        address_number: parseInt(currentCompany.address_number.toString()),
        phone: parseInt(currentCompany.phone),
      }
    );

    if (companyUpdated) {
      if (companyUpdated.status === 200) {
        toast.info("Empresa Atualizada!", ToastProps);
      }
    }

    console.log(companyUpdated);
  };

  const handleCreate = async () => {
    const response = await axios.post(
      `http://localhost:3000/company/${user?.id}`,
      {
        cnpj: currentCompany.cnpj,
        name: currentCompany.name,
        cep: currentCompany.cep,
        address: currentCompany.address,
        address_number: parseInt(currentCompany.address_number.toString()),
        phone: parseInt(currentCompany.phone),
      }
    );

    if (response) {
      if (response.status === 201) {
        toast.info("Empresa Criada!", ToastProps);
      }
    }
  };

  const cleanCompanyContext = () => {
    setCompany(null);
  };

  useEffect(() => {
    if (company && variant === "update") {
      setCurrentCompany({
        name: company?.name,
        cnpj: company?.cnpj,
        address: company?.address,
        address_number: company?.address_number.toString(),
        cep: company?.cep.toString(),
        phone: company?.phone,
      });
    } else {
      setIsEditable(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentCompany.cep.toString().length === CEP_LENGTH) {
      handleCepCompletion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCompany.cep]);

  return (
    <div className="screen">
      <GoBackButton endpoint="/home" onClick={cleanCompanyContext} />
      <div className="company-card">
        <div className="top-side">
          <div className="left-side">
            <BsFillBuildingFill className="icon" />
            <h1>Empresa</h1>
          </div>
          {variant === "update" ? (
            <Button variant={"default"} onClick={handleEditButton}>
              Editar
            </Button>
          ) : null}
        </div>
        <div className="update">
          <TextField
            variant="default"
            label="Nome: "
            text="h1"
            name="name"
            value={currentCompany.name}
            onChange={onFormChange}
            disabled={!isEditable}
          />
          <TextField
            variant="default"
            label="CNPJ: "
            subtitle="Apenas digite os numeros: (XX.XXX.XXX/XXXX-XX)."
            validation={currentCompany.cnpj.length === 14}
            text="h1"
            name="cnpj"
            value={currentCompany.cnpj}
            onChange={onFormChange}
            disabled={!isEditable}
          />
          <div className="form-line">
            <TextField
              variant="default"
              label="CEP: "
              subtitle="Apenas digite os numeros: (XXXXX-XXX)."
              validation={currentCompany.cep.length === 8}
              text="h1"
              name="cep"
              value={currentCompany.cep}
              onChange={onFormChange}
              disabled={!isEditable}
            />
            <TextField
              variant="default"
              label="Telefone: "
              subtitle="Apenas digite os numeros: (+55 (XX) XXXXX-XXXX)."
              validation={currentCompany.phone.length === 11}
              text="h1"
              name="phone"
              value={currentCompany.phone}
              onChange={onFormChange}
              disabled={!isEditable}
            />
          </div>
          <div className="form-line">
            <TextField
              variant="default"
              label="Rua: "
              text="h1"
              name="address"
              value={currentCompany.address}
              onChange={onFormChange}
              disabled={!isEditable}
            />
            <TextField
              variant="default"
              label="Numero: "
              text="h1"
              name="address_number"
              value={currentCompany.address_number}
              onChange={onFormChange}
              disabled={!isEditable}
            />
          </div>
          {isEditable ? (
            <Button
              variant={"default"}
              onClick={variant === "create" ? handleCreate : handleUpdate}
            >
              Salvar
            </Button>
          ) : null}
        </div>
        <ToastContainer icon={false} closeButton={false} />
      </div>
    </div>
  );
}
