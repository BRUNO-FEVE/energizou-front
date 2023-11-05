import "./index.less";

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
  const addressString = `endereço: ${address} ${address_number}`;
  return (
    <div className="card">
      <h1>{name}</h1>
      <p>cnpj: {cnpj}</p>
      <p>cep: {cep}</p>
      <p>{addressString}</p>
      <p>telefone: {phone}</p>
    </div>
  );
}
