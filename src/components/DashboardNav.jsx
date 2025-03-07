import { useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../url";

const DashboardNav = ({username}) => {
  const navigate = useNavigate();
    const logout = async (values) => {
      const response = await axios.post(
        `${url}/auth/logout`,{},
        { withCredentials: true },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      navigate("/");
    };
  return (
    <nav className="bg-gray-900 flex justify-between items-center p-6">
      <h1 className="text-white text-xl font-bold mb-0 pl-8">True Feedback</h1>
      <h1 className="text-white">Welcome, {username}</h1>
      <div className="pr-8">
        <button
          className="bg-slate-100 md:w-auto font-medium text-sm py-2 px-4 border border-input rounded-md flex justify-center items-center h-10"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNav;
