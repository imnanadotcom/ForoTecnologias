import React from "react";
import "./Post.css";

const Post = ({
    post,
    comments,  // Recibe los comentarios asociados al post
    onLike,
    onComment,
    isCommenting,
    commentText,
    onCommentChange,
    onPublishComment,
    onCancelComment,
}) => (
    <div className="post">
        {/* Renderiza el título del post como HTML */}
        <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
        
        {/* Renderiza el contenido del post como HTML */}
        <p dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="post-info">
            <span>{post.author}</span>
            <span>{post.created_at}</span>
        </div>

        <div className="like-container">
            <button className="btn-label" onClick={onLike}>
                <span className="like-count">{post.likes || 0}</span>
                {/* Aquí iría el ícono de like */}
            </button>
        </div>

        <hr className="separator" />

        <button className="btn-labelC" onClick={onComment}>
            Comentar
        </button>
        {isCommenting && (
            <div className="comment-section">
                <textarea
                    value={commentText}
                    onChange={onCommentChange}
                    placeholder="Escribe un comentario"
                />
                <button onClick={onPublishComment}>Publicar</button>
                <button onClick={onCancelComment}>Cancelar</button>
            </div>
        )}
        <div className="comments">
            {comments && comments.length > 0 ? (
                comments.map((comment, idx) => (
                    <div key={idx} className="comment">
                        <p>{comment.content}</p>
                        <span>{comment.author}</span>
                        <span>{comment.created_at}</span>
                    </div>
                ))
            ) : (
                <p>No hay comentarios aún.</p>
            )}
        </div>
    </div>
);

export default Post;
