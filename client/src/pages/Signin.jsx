import React from 'react'
import SigninForm from '../components/SigninForm';
import {Link} from "react-router-dom";

const Signin = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#1f2937]">
      <div className="bg-white py-5 px-6 rounded-lg ">
        <div className="max-w-sm">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-center m-3">
            Welcome Back to True Feedback
          </h1>
          <h5 className="text-center m-5">
            Sign in to continue your secret conversations
          </h5>
          <SigninForm />
          <div className='m-8 text-center'>
            Not a memeber yet? <Link to="/sign-up" className='text-blue-600 hover:text-blue-800 transition-all duration-100'>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin
