import { } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from './Wrapper.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Wrapper />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/u/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
    </>
  );
}

export default App
