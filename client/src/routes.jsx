import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddExpense />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  );
}
