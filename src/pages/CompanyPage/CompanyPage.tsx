import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./index.less";
import { EntitiesContext, companyData } from "../../context/entitiesContext";
import Button from "../../components/little-components/Button/Button";
import { BsFillBuildingFill } from "react-icons/bs";
import TextField from "../../components/little-components/TextField/TextField";
import axios from "axios";

const CEP_LENGTH = 8;

type variant = "create" | "update";

interface CompanyPageProps {
  variant: variant;
}

export default function CompanyPage({ variant }: CompanyPageProps) {
  const { company, user } = useContext(EntitiesContext);
  const [isEditable, setIsEditable] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<companyData>({
    name: "",
    cnpj: "",
    address: "",
    address_number: 0,
    cep: 0,
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

    console.log(companyUpdated);
  };

  useEffect(() => {
    if (company) {
      setCurrentCompany({
        name: company?.name,
        cnpj: company?.cnpj,
        address: company?.address,
        address_number: company?.address_number,
        cep: company?.cep,
        phone: company?.phone,
      });
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
      <div className="company-card">
        <div className="top-side">
          <div className="left-side">
            <BsFillBuildingFill className="icon" />
            <h1>Empresa</h1>
          </div>
          <Button
            label={"Editar"}
            variant={"default"}
            onClick={handleEditButton}
          />
        </div>
        <div className="update">
          <TextField
            variant="default"
            label="Name: "
            text="h1"
            name="name"
            value={currentCompany.name}
            onChange={onFormChange}
            disabled={!isEditable}
          />
          <TextField
            variant="default"
            label="CNPJ: "
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
              text="h1"
              name="cep"
              value={currentCompany.cep}
              onChange={onFormChange}
              disabled={!isEditable}
            />
            <TextField
              variant="default"
              label="Telefone: "
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
          <Button
            label={"Salvar"}
            variant={"default"}
            onClick={variant === "create" ? undefined : handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}
