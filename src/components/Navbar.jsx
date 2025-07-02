import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "sweetalert2/dist/sweetalert2.min.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Keluar?",
      text: "Apakah kamu yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire("Kamu telah logout.").then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <>
      <nav>
        <div className="shadow-md p-4 flex justify-between lg:justify-end gap-10 items-center">
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <HiOutlineMenu className="w-8 h-8 transition-transform duration-300 hover:scale-110 text-gray-800" />
          </button>

          <div className="hidden lg:flex gap-10 text-gray-700">
            <Link to="/order-history" className="text-[#1E293B] font-bold text-sm cursor-pointer">
              History
            </Link>
          </div>

          <button onClick={handleLogout} className="bg-[#EF4444] cursor-pointer text-white px-5 py-[10px] rounded-[5px] font-bold text-sm">
            Logout
          </button>
        </div>

        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsOpen(false)}>
          <div className={`bg-white w-[250px] h-full p-6 shadow-md transform transition-all duration-500 ease-in-out will-change-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <button className="mb-6 hover:rotate-90 transition-transform duration-300" onClick={() => setIsOpen(false)}>
              <HiOutlineX className="w-6 h-6 text-gray-800" />
            </button>
            <div className="space-y-10">
              <Link to="/order-history" className="text-[#1E293B] font-bold text-sm cursor-pointer">
                History
              </Link>

              <p onClick={handleLogout} className="cursor-pointer text-[#EF4444] font-bold text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
