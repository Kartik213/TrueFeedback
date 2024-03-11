import React from "react";
import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#1f2937]">
      <div className="bg-white py-5 px-6 rounded-lg ">
        <div className="max-w-sm">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-center m-3">
            Join True Feedback
          </h1>
          <h5 className="text-center m-5">
            Sign up to start your anonymous adventure
          </h5>
          <SignupForm />
          <div className="m-8 text-center">
            Not a memeber yet?{" "}
            <Link
              to="/sign-in"
              className="text-blue-600 hover:text-blue-800 transition-all duration-100"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
