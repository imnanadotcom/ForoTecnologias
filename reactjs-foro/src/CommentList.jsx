import React, { useState, useEffect } from "react";
import apiRoutes from "./apiRoutes";
import "./Post.css";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  // Función para eliminar comentario
  const handleDeleteComment = async (comment) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este comentario?");
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

  // Obtener los comentarios
  const getComments = async () => {
    try {
      const response = await fetch(`${apiRoutes.commentsByPost}?id_post=${post.id_post}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setComments(data.comment_details);
      }
    } catch (error) {
      console.error("Error getting comments:", error);
    }
  };

  // Función de "like"
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
          setIsLiked(false);
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
          setIsLiked(true);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error adding like", error);
      }
    }
  };

  // Obtener likes
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
    getComments();
  }, [post.id_post]);

  // Función para editar comentario
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id_comment);
    setEditedCommentText(comment.content);
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
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="buttons-container">
        <button className="like-btn" onClick={handleLike}>
          {isLiked ? "Liked" : "Like"} ({likes})
        </button>
        <button className="comment-btn" onClick={onComment}>Comentar</button>
        {post.id_user === currentUserId && (
          <button className="delete-post-btn" onClick={onDeletePost}>
            Eliminar post
          </button>
        )}
      </div>
      
      <div className="comments" style={{ maxHeight: "200px", overflowY: "scroll" }}>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id_comment} className="comment">
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
                  <p>{comment.content}</p>
                  <span>{comment.username}</span>
                  {comment.username === currentUserId && (
                    <div>
                      <button
                        onClick={() => handleDeleteComment(comment)}
                        className="delete-comment-btn"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="edit-comment-btn"
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
