import "react-toastify/dist/ReactToastify.css";
import { Button } from "../Button/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./index.less";
import axios from "axios";
import { useContext, useState } from "react";
import { EntitiesContext } from "../../../context/entitiesContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ToastProps } from "../Toast/Toast";

export interface CompanyListCellProps {
  cnpj: string;
  name: string;
  cep: number;
  address: string;
  address_number: number;
  phone: string;
}

export default function CompanyListCell({
  cnpj,
  name,
  cep,
  address,
  address_number,
  phone,
}: CompanyListCellProps) {
  const [isActive, setIsActive] = useState(true);
  const addressString = `endereço: ${address} ${address_number}`;

  const { user, company, setCompany } = useContext(EntitiesContext);

  const handleEdit = async () => {
    await axios.get(`http://localhost:3000/company/${cnpj}`).then((res) => {
      if (res.status === 200) {
        setCompany(res.data);
      }
    });
  };

  const deleteCompany = async () => {
    const respone = await axios.delete(
      `http://localhost:3000/user/${user?.id}/company/${cnpj}`
    );

    if (respone.status == 200) {
      setIsActive(false);
      toast.info("Empresa Apagada!", ToastProps);
    }
  };

  if (company) {
    return <Navigate to={"/update-company"} />;
  }

  return (
    <div className={`card ${isActive ? null : "hidden"}`}>
      <h1>{name}</h1>
      <p>cnpj: {cnpj}</p>
      <p>cep: {cep}</p>
      <p>{addressString}</p>
      <p>telefone: {phone}</p>
      <ToastContainer icon={false} closeButton={false} />
      <div>
        <Button variant="default" onClick={handleEdit}>
          Editar
        </Button>
        <Button variant="default" color="red" onClick={deleteCompany}>
          <RiDeleteBin5Line className="icon" />
          Deletar
        </Button>
      </div>
    </div>
  );
}
