import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    navigate("/");
  };

  if (!token) return null;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold">WFH Absensi</h1>

      <div className="flex gap-4">
        <Link to="/profile" className="hover:underline">
          Profil
        </Link>
        <Link to="/absen" className="hover:underline">
          Absen
        </Link>
        <Link to="/summary" className="hover:underline">
          Summary
        </Link>

        {/* Menu HRD-only */}
        {role === "HRD" && (
          <>
            <Link to="/employees" className="hover:underline">
              Data Karyawan
            </Link>
            <Link to="/attendance-summary" className="hover:underline">
              Absensi Semua
            </Link>
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
