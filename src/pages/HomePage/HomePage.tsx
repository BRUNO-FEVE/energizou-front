import { ChangeEvent, useContext, useEffect, useState } from "react";
import CompanyList from "../../components/CompanyList/CompanyList";
import TextField from "../../components/little-components/TextField/TextField";
import "./index.less";
import axios from "axios";
import { EntitiesContext } from "../../context/entitiesContext";
import { CompanyListCellProps } from "../../components/little-components/CompanyListCell/CompanyListCell";
import { Navigate } from "react-router-dom";
import {
  Button,
  NavButton,
} from "../../components/little-components/Button/Button";
import { BsFillBuildingFill } from "react-icons/bs";

export default function HomePage() {
  const [companies, setCompanies] = useState<CompanyListCellProps[] | null>(
    null
  );
  const [cnpj, setCnpj] = useState<string>("");

  const { user, company, setCompany } = useContext(EntitiesContext);

  const handleCompanies = async () => {
    await axios
      .get(`http://localhost:3000/companies/${user?.id}`)
      .then((res) => {
        setCompanies(res.data);
        console.log(res.data);
      });
  };

  const handleChangeInputField = (event: ChangeEvent<HTMLInputElement>) => {
    setCnpj(event.target.value);
  };

  const searchCompanyByCnpj = async () => {
    await axios.get(`http://localhost:3000/company/${cnpj}`).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setCompany(res.data);
      }
    });
  };

  useEffect(() => {
    handleCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (company) {
    return <Navigate to={"/update-company"} />;
  }

  return (
    <div className="home">
      <div className="top-bar">
        <div className="left-side">
          <div>
            <BsFillBuildingFill className="icon" />
            <h1>Empresas:</h1>
            <TextField
              placeholder="Buscar por cnpj"
              variant="single"
              onChange={handleChangeInputField}
            />
          </div>
          <Button variant="default" value={cnpj} onClick={searchCompanyByCnpj}>
            Buscar
          </Button>
        </div>
        <NavButton endpoint={"/create-company"}>
          <Button variant="default" color="yellow" className="create-button">
            Cadastrar Empresa
          </Button>
        </NavButton>
      </div>
      <CompanyList companies={companies} />
    </div>
  );
}
