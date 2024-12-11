import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "./Profile.css";

const GoBackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/principal');
    };

    return (
        <button
            className="go-back-btn"
            onClick={handleGoBack}
        >
            <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                    <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
                    <path
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        fill="#000000"
                    />
                </svg>
            </div>
            <p>Regresar</p>
        </button>
    );
};

const Profile = () => {
    const [user, setUser] = useState({
        username: "admin",
        email: "admin@example.com",
        password: "password123",
    });

    const [editingField, setEditingField] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleEdit = (field) => {
        setEditingField(field);
        setInputValue(user[field]);
    };

    const handleSave = () => {
        setUser({ ...user, [editingField]: inputValue });
        setEditingField("");
        alert("Información actualizada correctamente");
    };

    const handleCancel = () => {
        setEditingField("");
    };

    return (
        <StyledWrapper>
            <GoBackButton />
            <div className="form">
                <p className="form-title">Perfil</p>
                <div className="info-container">
                    {["username", "email", "password"].map((field) => (
                        <div className="info-item" key={field}>
                            <p>
                                <strong>
                                    {field === "username"
                                        ? "Nombre de usuario:"
                                        : field === "email"
                                            ? "Email:"
                                            : "Contraseña:"}
                                </strong>
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(field)}
                                >
                                    ✏️
                                </button>
                            </p>
                            <p>{user[field]}</p>
                            {editingField === field && (
                                <div className="edit-box">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    <div className="action-buttons">
                                        <button className="save-btn" onClick={handleSave}>
                                            Guardar
                                        </button>
                                        <button className="cancel-btn" onClick={handleCancel}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
    
`;

export default Profile;
