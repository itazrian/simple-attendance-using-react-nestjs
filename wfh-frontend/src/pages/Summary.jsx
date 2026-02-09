import { useEffect, useState } from "react";
import axios from "axios";

export default function Summary() {
  const token = localStorage.getItem("token");

  const today = new Date().toISOString().split("T")[0];
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  )
    .toISOString()
    .split("T")[0];

  const [from, setFrom] = useState(firstDayOfMonth);
  const [to, setTo] = useState(today);
  const [data, setData] = useState([]);

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/attendance/summary?from=${from}&to=${to}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.data);
    } catch (err) {
      alert("Gagal mengambil data summary");
    }
  };

  useEffect(() => {
    fetchSummary(); // default load
  }, []);

  return (
    <div className="p-4">
      {/* FILTER */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          className="border p-2"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="date"
          className="border p-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button
          onClick={fetchSummary}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Cari
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Masuk</th>
            <th className="border p-2">Pulang</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4">
                Tidak ada data
              </td>
            </tr>
          )}

          {data.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">
                {item.check_in || "-"}
              </td>
              <td className="border p-2">
                {item.check_out || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
