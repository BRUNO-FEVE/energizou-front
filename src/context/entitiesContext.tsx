/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, createContext, useState } from "react";

export interface userData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface companyData {
  cnpj: string;
  name: string;
  cep: number;
  address: string;
  address_number: number;
  phone: string;
  user?: userData;
}

interface DefaultEntitiesProps {
  user: userData | null;
  company: companyData | null;
  setUser: (user: userData) => void;
  setCompany: (company: companyData | null) => void;
}

const DefaultEntities: DefaultEntitiesProps = {
  user: null,
  company: null,
  setUser: (_user: userData) => {
    return;
  },
  setCompany: (_company: companyData | null) => {
    return;
  },
};

export const EntitiesContext = createContext(DefaultEntities);

export function EntitiesProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<userData | null>(null);
  const [company, setCompany] = useState<companyData | null>(null);

  return (
    <EntitiesContext.Provider value={{ user, company, setUser, setCompany }}>
      {children}
    </EntitiesContext.Provider>
  );
}
