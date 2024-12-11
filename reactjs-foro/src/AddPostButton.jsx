import React, { useState } from "react";
import NewPostPopup from "./NewPostPopup";
import "./AddPostButton.css";

const AddPostButton = ({ onAddPost }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", content: "" }); // Cambiado "text" por "content"

    const togglePopup = () => setShowPopup(!showPopup);

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleAddPost = () => {
        if (newPost.title && newPost.content) { // Cambiado "text" por "content"
            onAddPost(newPost); // Pasar el nuevo post al componente padre
            setNewPost({ title: "", content: "" }); // Reiniciar los campos
            togglePopup();
        } else {
            alert("Por favor completa ambos campos");
        }
    };

    return (
        <div className="button-container">
            <button className="Btn" onClick={togglePopup}>
                Nuevo Post
            </button>
            <NewPostPopup
                isVisible={showPopup}
                onClose={togglePopup}
                onChange={handlePostChange}
                onSubmit={handleAddPost}
                post={newPost}
            />
        </div>
    );
};

export default AddPostButton;
