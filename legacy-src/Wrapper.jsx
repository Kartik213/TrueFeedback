import {useNavigate, Outlet} from "react-router-dom";
import { useEffect } from "react";

const Wrapper = () => {
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) {
        navigate("/dashboard");
        }
    }, []);
    return <Outlet />
}

export default Wrapper
