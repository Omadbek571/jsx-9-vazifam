import React from "react";
import { Link, useNavigate } from "react-router-dom";

function MainLayout({ children }) {

    const navigate = useNavigate()


    function handleClick(event) {
        event.preventDefault()

        navigate("/login")

        localStorage.removeItem("token")
        localStorage.removeItem("user")


    }
    return (
        <div className="base-container">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost text-xl">Home</a>
                </div>
                <div className="flex  gap-4">
                    <button onClick={handleClick} className="btn btn-outline btn-success">logout</button>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}

export default MainLayout;
