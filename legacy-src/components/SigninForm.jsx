import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import url from '../url';

const SigninForm = () => {
  const navigate = useNavigate();
  const SigninSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const login = async(values) => {
    try{
      const response = await axios.post(
        `${url}/auth/login`,
        values,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          'withCredentials': true,
        }
      );
      if(response.status === 201){
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("username", response.data.username);
        toast.success("Signed In successfully");
        navigate("/dashboard");
      }
    }catch(err){
      console.error(err);
      toast.error(err.response.data.message);
    }
  }
  return (
    <Formik
      initialValues={{
        emailOrUsername: "",
        password: "",
      }}
      validationSchema={SigninSchema}
      onSubmit={(values) => login(values)}
    >
      <Form>
        <div className="m-4">
          <label className="text-sm font-medium">Email</label>
          <Field
            name="emailOrUsername"
            type="text"
            className="rounded-md font-light w-full px-4 py-2 border border-solid border-[#ebedf2] focus:border-[#80bdff] outline-none transition-[border-color] duration-150 ease-in-out placeholder:font-normal"
          />
          <ErrorMessage
            name="emailOrUsername"
            component="div"
            className="text-xs text-rose-600"
          />
        </div>
        <div className="m-4">
          <label className="text-sm font-medium">Password</label>
          <Field
            name="password"
            type="password"
            className="rounded-md font-light w-full px-4 py-2 border border-solid border-[#ebedf2] focus:border-[#80bdff] outline-none transition-[border-color] duration-150 ease-in-out placeholder:font-normal"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-xs text-rose-600"
          />
        </div>
        <div className="m-4">
          <button className="bg-[#0F172A] w-full text-white py-2 px-4 rounded-md font-medium text-sm">
            Sign In
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default SigninForm
