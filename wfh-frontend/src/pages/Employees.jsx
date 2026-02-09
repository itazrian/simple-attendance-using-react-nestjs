import { useState, useEffect } from "react";
import API from "../services/api";

export default function Employees() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "EMPLOYEE" });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const submit = async () => {
    if (editId) {
      await API.put(`/users/${editId}`, form);
    } else {
      await API.post("/users", form);
    }
    setForm({ name: "", email: "", password: "", role: "EMPLOYEE" });
    setEditId(null);
    fetchUsers();
  };

  const edit = (user) => {
    setForm({ ...user, password: "" });
    setEditId(user.id);
  };

  const remove = async (id) => {
    if (confirm("Hapus user ini?")) {
      await API.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Data Karyawan</h1>

      <div className="mb-4 p-4 border rounded">
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="border p-1 mr-2"
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="border p-1 mr-2"
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="HRD">HRD</option>
        </select>
        <button onClick={submit} className="bg-blue-600 text-white px-3 py-1 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => edit(u)} className="bg-yellow-500 px-2 py-1 rounded">Edit</button>
                <button onClick={() => remove(u.id)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
