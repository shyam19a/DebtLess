import { useEffect, useState } from "react";
import { addExpense } from "../api/expense.api";
import api from "../api/axiosInstance";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [paidBy, setPaidBy] = useState("");
  const [newUser, setNewUser] = useState("");
  const [success, setSuccess] = useState("");
  const [overview, setOverview] = useState({
    expenses: [],
    settlements: []
  });

  // Fetch users + init participants
  const refreshUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
    setParticipants(res.data.map(u => u.id));
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  // Fetch overview
  const refreshOverview = async () => {
    const res = await api.get("/expenses/overview");
    setOverview(res.data);
  };

  useEffect(() => {
    refreshOverview();
  }, []);

  // Add member
  const addMember = async () => {
    if (!newUser.trim()) return;

    await api.post("/users", {
      name: newUser,
      email: `${newUser.toLowerCase()}@test.com`
    });

    setNewUser("");
    refreshUsers();
  };

  // Remove member
  const removeMember = async (id) => {
    await api.delete(`/users/${id}`);
    refreshUsers();
  };

  // Submit expense
  const submit = async () => {
    if (!amount || !paidBy || participants.length === 0) return;

    try {
      await addExpense({
        description: "Dinner",
        amount: Number(amount),
        paidBy: Number(paidBy),
        splits: participants.map(id => ({
          userId: id,
          share: amount / participants.length
        }))
      });

      refreshOverview();

      setSuccess("Expense added successfully ✅");
      setAmount("");
      setPaidBy("");

      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", gap: "30px" }}>

        {/* LEFT COLUMN */}
        <div className="card">
          <h2>Add Expense</h2>

          <div className="input-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Paid By</label>
            <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
              <option value="">Select user</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* MEMBERS + PARTICIPANTS */}
          <div className="input-group">
            <label>Members</label>

            {users.map(u => (
              <div
                key={u.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "8px"
                }}
              >
                <span>{u.name}</span>

                <input
                  type="checkbox"
                  checked={participants.includes(u.id)}
                  onChange={() =>
                    setParticipants(p =>
                      p.includes(u.id)
                        ? p.filter(id => id !== u.id)
                        : [...p, u.id]
                    )
                  }
                />

                <button
                  style={{ background: "transparent", color: "red" }}
                  onClick={() => removeMember(u.id)}
                >
                  ✕
                </button>
              </div>
            ))}

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <input
                placeholder="Add member name"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
              <button onClick={addMember}>Add</button>
            </div>
          </div>

          <button onClick={submit}>Add Expense</button>

          {success && <div className="success">{success}</div>}
        </div>

        {/* RIGHT COLUMN */}
        <div className="card">
          <h3>Paid Activity</h3>

          {overview.expenses.length === 0 && <p>No expenses yet</p>}

          {overview.expenses.map(exp => (
            <div key={exp.id}>
              ₹{exp.amount} paid by {exp.paid_by}
            </div>
          ))}

          <hr style={{ margin: "20px 0" }} />

          <h3>Who Owes Whom</h3>

          {overview.settlements.length === 0 && <p>All settled 🎉</p>}

          {overview.settlements.map((s, i) => (
            <div key={i}>
              {s.from} owes {s.to} ₹{s.amount}
            </div>
          ))}

          <button
            style={{
              marginTop: "15px",
              background: "#22c55e",
              color: "#000"
            }}
            onClick={async () => {
              await api.post("/expenses/settle");
              refreshOverview();
            }}
          >
            Settle Up
          </button>
        </div>

      </div>
    </div>
  );
}
