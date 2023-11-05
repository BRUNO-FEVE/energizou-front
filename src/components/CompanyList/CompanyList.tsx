import CompanyListCell, {
  CompanyListCellProps,
} from "../little-components/CompanyListCell/CompanyListCell";
import "./index.less";

interface CompanyListProps {
  companies: CompanyListCellProps[] | null;
}

export default function CompanyList({ companies }: CompanyListProps) {
  return (
    <div className="list">
      {companies?.map((company, index) => (
        <CompanyListCell
          key={index}
          cnpj={company.cnpj}
          name={company.name}
          cep={company.cep}
          address={company.address}
          address_number={company.address_number}
          phone={company.phone}
        />
      ))}
    </div>
  );
}
