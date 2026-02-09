import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState({ phone: "", photo: "", password: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data.profile);
        setEdit({ ...res.data.profile, password: "" });
      });
  }, []);

  const handleUpdate = async () => {
    const res = await axios.put(
      "http://localhost:3000/auth/profile",
      edit,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert(res.data.message);
    setProfile(res.data.profile);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profil Karyawan</h2>

      <div className="mb-2">
        <label>Nama:</label>
        <input
          className="w-full border p-2"
          value={edit.name}
          onChange={(e) => setEdit({ ...edit, name: e.target.value })}
        />
      </div>

      <div className="mb-2">
        <label>Email:</label>
        <input className="w-full border p-2" value={profile.email} disabled />
      </div>

      <div className="mb-2">
        <label>Posisi:</label>
        <input className="w-full border p-2" value={edit.position} disabled />
      </div>

      <div className="mb-2">
        <label>Nomor HP:</label>
        <input
          className="w-full border p-2"
          value={edit.phone}
          onChange={(e) => setEdit({ ...edit, phone: e.target.value })}
        />
      </div>

      <div className="mb-2">
        <label>Foto URL:</label>
        <input
          className="w-full border p-2"
          value={edit.photo || ""}
          onChange={(e) => setEdit({ ...edit, photo: e.target.value })}
        />
      </div>

      <div className="mb-2">
        <label>Password Baru:</label>
        <input
          type="password"
          className="w-full border p-2"
          value={edit.password || ""}
          onChange={(e) => setEdit({ ...edit, password: e.target.value })}
        />
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white p-2 rounded mt-4"
      >
        Update Profil
      </button>
    </div>
  );
}
