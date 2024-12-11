// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate(); // Initialize navigate inside the component

    const handleLogout = () => {
        navigate("/login");
    };

    const profileInfo = () => {
        navigate("/profile");
    };

    return (
        <div className="header">
            <label className="popup">
                <input type="checkbox" />
                <div tabIndex={0} className="burger">
                    <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        height={20}
                        width={20}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
                    </svg>
                </div>
                <nav className="popup-window">
                    <div className="option" onClick={profileInfo}>
                        Ver perfil
                    </div>
                    <hr />
                    <div className="option" onClick={handleLogout}>
                        Cerrar sesión
                    </div>
                </nav>
            </label>
        </div>
    );
};

export default Header;