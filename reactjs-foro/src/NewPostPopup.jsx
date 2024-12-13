
import React from "react";
import "./NewPostPopup.css";

const NewPostPopup = ({ isVisible, onClose, onChange, onSubmit, post }) =>
    isVisible && (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Nuevo Post</h2>
                <input
                    type="text"
                    placeholder="Título"
                    name="title"
                    value={post.title}
                    onChange={onChange}
                />
                <textarea
                    placeholder="Texto"
                    name="content" 
                    value={post.text}
                    onChange={onChange}
                />
                <button onClick={onSubmit}>Publicar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );

export default NewPostPopup;
