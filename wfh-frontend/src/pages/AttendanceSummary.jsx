import { useEffect, useState } from "react";
import API from "../services/api";

export default function AttendanceSummary() {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchData = async () => {
    try {
      const res = await API.get("/attendance/all", { params: { from, to } });
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Absensi Semua Karyawan</h1>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Check In</th>
            <th className="border p-2">Check Out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id}>
              <td className="border p-2">{a.id}</td>
              <td className="border p-2">{a.user?.name || "-"}</td>
              <td className="border p-2">{a.date}</td>
              <td className="border p-2">{a.check_in || "-"}</td>
              <td className="border p-2">{a.check_out || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
