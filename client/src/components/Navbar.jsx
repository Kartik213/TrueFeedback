import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 flex justify-between items-center p-6">
      <h1 className="text-white text-xl font-bold mb-0 pl-8">
        True Feedback
      </h1>
      <div className="pr-8">
        <Link className="bg-slate-100 md:w-auto font-medium text-sm py-2 px-4 border border-input rounded-md flex justify-center items-center h-10" to={'/sign-in'}>
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar
