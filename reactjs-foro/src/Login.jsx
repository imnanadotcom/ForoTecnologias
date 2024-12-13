import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiRoutes from "./apiRoutes"; 

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        
        if (!username || !password) {
            setError("Por favor, ingresa usuario y contraseña.");
            return;
        }

        try {
            setError(""); 
           
            const response = await axios.post(apiRoutes.login, {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            
            if (response.status === 200) {
                const token = response.data.token; 

                localStorage.setItem('authToken', token);
                console.log(token)
                setError(""); 
                navigate("/principal"); 
            }
        } catch (err) {
            
            setError(err.response?.data?.message || "Nombre de usuario o contraseña incorrectos");
        }
    };

    return (
        <StyledWrapper>
            <form className="form" onSubmit={handleLogin}>
                <p className="form-title">Iniciar Sesión</p>
                {error && <p className="error">{error}</p>}
                <div className="input-container">
                    <input
                        placeholder="Nombre de usuario"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="submit" type="submit">
                    Iniciar Sesión
                </button>
                <p className="signup-link">
                    ¿No tienes cuenta? <a href="/signup">Regístrate</a>
                </p>
            </form>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    background-color: #f4f4f4;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

  .form {
    background-color: #fff;
    display: block;
    padding: 5rem;
    max-width: 500px;
    border-radius: 25px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
      position: relative;
      top: -100px;
      left: 0;  
  }

    .form-title {
        font-size: 50px;
        line-height:50px; 
        font-weight: bold;
        text-align: center;
        color: #000;
        margin-bottom: 20px; 
        position: relative;
        top: -50px;
        
    }

    .input-container {
        margin-bottom: 12px;
    }

    .input-container input {
        width: 100%; 
        height: 40px; 
        padding: 10px; 
        font-size: 16px; 
        border-radius: 5px; 
        border: 1px solid #e5e7eb;
        box-sizing: border-box; 
        position: relative; 
        top: 0px;
    }

    .input-container input {
        background-color: #fff;
        padding: 1rem;
        font-size: 40px;
        line-height: 1.25rem;
        width: 500px;
        height: 100px;  
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .submit {
        margin-top: 1rem;
        padding: 0.75rem;
        background-color: #4f46e5;
        color: white;
        font-weight: bold;
        text-transform: uppercase;
        border-radius: 0.5rem;
        width: 500px;
        height: 70px;
        cursor: pointer;
        font-size: 30px;
        position: relative; 
        top: 0px;
    }

    .signup-link {
        color: #6b7280;
        font-size: 30px;
        line-height: 1.25rem;
        text-align: center;
        margin-top: 1rem; 
        position: relative;
        top: 40px;
    }

    .signup-link a {
        text-decoration: underline;
    }

    .error {
        color: red;
        font-size: 100px;
        text-align: center;
    }
`;

export default Login;
