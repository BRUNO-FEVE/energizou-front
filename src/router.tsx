import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResgisterPage from "./pages/RegisterPage/ResgisterPage";
import HomePage from "./pages/HomePage/HomePage";
import CompanyPage from "./pages/CompanyPage/CompanyPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<ResgisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route
        path="/update-company"
        element={<CompanyPage variant="update" />}
      />
      <Route
        path="/create-company"
        element={<CompanyPage variant="create" />}
      />
    </Routes>
  );
}
