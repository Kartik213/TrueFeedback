import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../url";

const SignupForm = () => {
  const navigate = useNavigate();
  const url2 = window.location.origin;
  const usernameRegExp = /^[A-Za-z0-9_]+$/;
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(usernameRegExp, "Username must not contain special characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .required("Password is required"),
  });
  const register = async (values) => {
    try{
      const response = await axios.post(
        `${url}/auth/register`,
        { ...values, url: url2 },
      );
      console.log(response);
      if(response.status === 201){
        toast.success(response.data.message);
        navigate("/sign-in");
      }
    }catch(err){
      console.error(err);
      toast.error(err.response.data.message);
    }
  }
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => register(values)}
    >
      <Form>
        <div className="m-4">
          <label className="text-sm font-medium">Username</label>
          <Field
            name="username"
            type="text"
            className="rounded-md font-light w-full px-4 py-2 border border-solid border-[#ebedf2] focus:border-[#80bdff] outline-none transition-[border-color] duration-150 ease-in-out placeholder:font-normal"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="text-xs text-rose-600"
          />
        </div>
        <div className="m-4">
          <label className="text-sm font-medium">Email</label>
          <Field
            name="email"
            type="email"
            className="rounded-md font-light w-full px-4 py-2 border border-solid border-[#ebedf2] focus:border-[#80bdff] outline-none transition-[border-color] duration-150 ease-in-out placeholder:font-normal"
          />
          <ErrorMessage
            name="email"
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
            Sign Up
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignupForm;
