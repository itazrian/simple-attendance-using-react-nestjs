import axios from "axios";

export default function Absen() {
  const token = localStorage.getItem("token");

  const absenMasuk = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/attendance/check-in",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Absen masuk berhasil");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal absen masuk");
    }
  };

  const absenPulang = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/attendance/check-out",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Absen pulang berhasil");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal absen pulang");
    }
  };

  return (
    <div className="p-4 flex gap-4">
      <button
        onClick={absenMasuk}
        className="bg-blue-600 text-white p-3 rounded"
      >
        Absen Masuk
      </button>

      <button
        onClick={absenPulang}
        className="bg-red-600 text-white p-3 rounded"
      >
        Absen Pulang
      </button>
    </div>
  );
}
