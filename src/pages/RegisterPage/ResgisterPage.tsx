import "./index.less";
import { useContext } from "react";
import { EntitiesContext, UserContext } from "../../context/entitiesContext";

export default function ResgisterPage() {
  const { user } = useContext(EntitiesContext);
  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.password}</p>
    </div>
  );
}
