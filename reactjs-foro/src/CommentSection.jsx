import React from "react";
import "./CommentSection.css";

const CommentSection = ({ commentText, onCommentChange, onPublishComment, onCancelComment }) => (
    <div className="comment-section">
        <textarea
            placeholder="Escribe tu comentario"
            value={commentText}
            onChange={onCommentChange}
        />
        <div className="comment-buttons">
            <button className="btn-publish" onClick={onPublishComment}>
                Publicar
            </button>
            <button className="btn-cancel" onClick={onCancelComment}>
                Cancelar
            </button>
        </div>
    </div>
);

export default CommentSection;
