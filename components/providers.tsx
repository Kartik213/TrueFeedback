"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        toastClassName="funk-toast"
        bodyClassName="funk-toast-body"
        closeButton={false}
        icon={false}
      />
    </SessionProvider>
  );
}
