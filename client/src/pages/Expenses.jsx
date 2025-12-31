import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    api.get("/expenses").then(res => setExpenses(res.data));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>All Expenses</h2>

        {expenses.length === 0 && <p>No expenses yet</p>}

        {expenses.map(exp => (
          <div key={exp.id} style={{ marginBottom: "10px" }}>
            <strong>{exp.description}</strong><br />
            ₹{exp.amount} paid by {exp.paid_by}
          </div>
        ))}
      </div>
    </div>
  );
}
