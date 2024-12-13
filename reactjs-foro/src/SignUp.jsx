import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiRoutes from "./apiRoutes"; 
import "./SignUp.css";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            setError("");
            setSuccess("");

            
            const response = await axios.post(apiRoutes.signUp, {
                username,
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

           
            if (response.status === 201) {
                setSuccess("Cuenta creada exitosamente");
                // Redirige directamente al login
                navigate("/login");
            }

        } catch (err) {
            setError(err.response?.data?.message || "Error al crear la cuenta");
        }
    };

    return (
        <StyledWrapper>
            <form className="form" onSubmit={handleSubmit}>
                <p className="form-title">Crear cuenta</p>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
`;

export default SignUp;
