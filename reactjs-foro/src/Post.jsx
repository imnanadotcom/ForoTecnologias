import React, { useState, useEffect } from "react";
import apiRoutes from "./apiRoutes";
import "./Post.css";
import CommentList from "./CommentList";
const Post = ({
  post,
  onLike,
  onComment,
  isCommenting,
  commentText,
  onCommentChange,
  onPublishComment,
  onCancelComment,
  onDeletePost,
  currentUserId,
}) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Nuevo estado para controlar la expansión
  const [comments, setComments] = useState([]); // Nuevo estado para los comentarios
  const [editingCommentId, setEditingCommentId] = useState(null); // Estado para manejar la edición de comentarios
  const [editedCommentText, setEditedCommentText] = useState(""); // Estado para almacenar el texto editado

  // Función para verificar si el post ya está "likeado" por el usuario actual
  const handleDeleteComment = async (comment) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este comentario?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(apiRoutes.deleteComment, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            id_comment: comment.id_comment,
          }),
        });
  
        const data = await response.json();
        if (response.ok) {
          alert("Comentario eliminado");
          setComments(comments.filter((c) => c.id_comment !== comment.id_comment));
        } else {
          alert("Error al eliminar el comentario.");
        }
      } catch (error) {
        console.error("Error al eliminar el comentario", error);
      }
    }
  };
  
  const getComments = async () => {
    try {
      const response = await fetch(
        `${apiRoutes.commentsByPost}?id_post=${post.id_post}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setComments(data.comment_details); // Guarda los comentarios en el estado
      }
    } catch (error) {
      console.error("Error getting comments:", error);
    }
  };

  const checkIfLiked = async () => {
    try {
      const response = await fetch(
        `${apiRoutes.isLikedByUser}?id_post=${post.id_post}&id_user=${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setIsLiked(data.isLiked); // El API retorna un campo isLiked
      }
    } catch (error) {
      console.error("Error checking if post is liked:", error);
    }
  };

  useEffect(() => {
    checkIfLiked();
  }, [post.id_post, currentUserId]);
  
  useEffect(() => {
    getComments();
  }, [post.id_post]);

  const handleLike = async () => {
    if (isLiked) {
      try {
        const response = await fetch(apiRoutes.unlikePost, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            id_user: currentUserId,
            id_post: post.id_post,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setLikes(likes - 1);
          setIsLiked(false); // Actualiza el estado a "no likeado"
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error removing like", error);
      }
    } else {
      try {
        const response = await fetch(apiRoutes.likePost, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            id_user: currentUserId,
            id_post: post.id_post,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setLikes(likes + 1);
          setIsLiked(true); // Actualiza el estado a "likeado"
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error adding like", error);
      }
    }
  };

  const getLikes = async () => {
    try {
      const response = await fetch(
        `${apiRoutes.likes_by_post}?id_post=${post.id_post}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setLikes(data.likes_count);
      }
    } catch (error) {
      console.error("Error getting likes:", error);
    }
  };

  useEffect(() => {
    getLikes();
  }, [post.id_post]);

  // Obtener el contenido truncado y mostrar más/menos
  const truncatedContent = post.content.length > 300 ? post.content.substring(0, 300) + "..." : post.content;

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id_comment);
    setEditedCommentText(comment.content); // Establece el texto del comentario en el estado para editarlo
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(apiRoutes.editComment, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          id_comment: editingCommentId,
          content: editedCommentText,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Comentario editado correctamente");
        setComments(
          comments.map((comment) =>
            comment.id_comment === editingCommentId
              ? { ...comment, content: editedCommentText }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditedCommentText("");
      } else {
        alert("Error al editar el comentario.");
      }
    } catch (error) {
      console.error("Error al editar el comentario", error);
    }
  };

  return (
    <div className="post">
      <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
      <p dangerouslySetInnerHTML={{ __html: isExpanded ? post.content : truncatedContent }} />
      {post.content.length > 300 && (
        <button className="read-more-toggle" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Leer menos" : "Leer más"}
        </button>
      )}
      <div className="post-info">
        <span>{post.author}</span>
        <span>{post.created_at}</span>
      </div>

      <div className="buttons-container">
  <div className="like-container">
    <button className={`btn-label ${isLiked ? "liked" : ""}`} onClick={handleLike}>
      <span className="like-count">{likes}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="1.13em" height="1em" viewBox="0 0 27 24">
        <path fill="currentColor" d="M1.547 24a.33.33 0 0 1-.327-.295v-.001L0 11.336l-.001-.031c0-.182.147-.329.329-.329h8.233v13.025zm3.36-3.265v.001a1.301 1.301 0 1 0 1.301-1.301h-.002c-.719 0-1.301.582-1.302 1.301zm.48-8c0 .181.147.328.329.328h.764a.328.328 0 0 0 0-.656h-.77a.33.33 0 0 0-.329.329v.003zm-3.61 0c0 .181.147.328.328.328H4.61a.328.328 0 0 0 0-.656H2.099a.33.33 0 0 0-.328.328v.003zm9.8 9.388a1.9 1.9 0 0 1-.494-.253l.006.004l-.1-.063a21 21 0 0 1-.69-.452l-.101-.071c-.132-.095-.194-.137-.262-.133l-.72.01V12.01l-.013-.77c.451-.287.867-.56.992-.664c.17-.342.338-.628.524-.902l-.017.027q.13-.2.248-.396l1.724-2.894q.122-.204.254-.408c.145-.216.299-.474.44-.74l.024-.049a.9.9 0 0 0 .079-.521l.001.005l-.006-3.12c.063-.454.319-.838.68-1.072l.006-.004a1.97 1.97 0 0 1 1.162-.5h.007l.063-.001c.341 0 .663.081.949.224l-.012-.006c.191.092.354.19.507.3l-.01-.007l.106.07c.241.127.421.341.501.6l.002.007c.187.696.358 1.329.517 1.964l.066.259c.101.34.188.751.244 1.172l.005.042c-.171 1.574-.5 3.01-.976 4.378l.042-.138l7.693-.011h.028a1.643 1.643 0 0 1 1.63 1.848l.001-.008a1.98 1.98 0 0 1-.894 1.781l-.008.005a2.17 2.17 0 0 1 .372 1.4v-.007a1.85 1.85 0 0 1-1.137 1.873l-.012.004a2.4 2.4 0 0 1 .299 1.31v-.006a1.9 1.9 0 0 1-.886 1.733l-.008.005a2.8 2.8 0 0 1 .224 1.459l.001-.013v.188a1.834 1.834 0 0 1-2.007 1.719l.007.001h-4.429l-.015.001l-.016-.001h.001h-5.91c-.051 0-.104 0-.16.008c-.068.004-.14.01-.214.01h-.015a1.1 1.1 0 0 1-.299-.04l.008.002zm-6.015-1.387a.64.64 0 1 1 1.281.001a.64.64 0 0 1-1.281-.001" />
      </svg>
    </button>
  </div>
  <button className="btn-labelC" onClick={onComment}>
    Comentar
  </button>
  {post.id_user === currentUserId && (
    <div className="delete-edit-container">
      <button className="btn-label btn-trash" onClick={onDeletePost}>
        <svg
          className="svgs"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
          />
        </svg>
      </button>
      <button className="btn-label btn-edit" onClick={handleEditPost}>
        Editaraaaaaaaa
      </button>
    </div>
  )}
</div>


      <hr className="separator" />
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

<div className="comments" style={{ maxHeight: "200px", overflowY: "scroll" }}>
  {comments && comments.length > 0 ? (
    comments.map((comment, idx) => (
      <div key={idx} className="comment">
        {editingCommentId === comment.id_comment ? (
          <div>
            <textarea
              value={editedCommentText}
              onChange={(e) => setEditedCommentText(e.target.value)}
            />
            <button onClick={handleSaveEdit}>Guardar</button>
            <button onClick={() => setEditingCommentId(null)}>Cancelar</button>
          </div>
        ) : (
          <>
            <p dangerouslySetInnerHTML={{ __html: comment.content }} />
            <span>{comment.username}</span>
            {comment.username === currentUserId && (
              <div className="comment-actions">
                <button
                  onClick={() => handleDeleteComment(comment)}
                  className="btn-delete-comment"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditComment(comment)}
                  className="btn-edit-comment"
                >
                  Editar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    ))
  ) : (
    <p>No hay comentarios aún</p>
  )}
</div>

    </div>
  );
};

export default Post;
