import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";


const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setError(""); // Clear any existing error
        // Add your logic here for saving the profile changes
        navigate("/principal");
    };

    return (
        <StyledWrapper>
            <form className="form" onSubmit={handleSubmit}>
                <p className="form-title">Crear cuenta</p>
                {error && <p className="error">{error}</p>}
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Crea tu nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Crea tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit">
                    Crear cuenta
                </button>
                <p className="signup-link">
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                </p>
            </form>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    height: 100vh; /* Make the wrapper take the full viewport height */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4; /* Add a background to the page */
}



`;

export default SignUp;
