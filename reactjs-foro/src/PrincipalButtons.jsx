import React, { useState, useEffect } from "react";
import Header from "./Header";
import Post from "./Post";
import AddPostButton from "./AddPostButton";
import apiRoutes from "./apiRoutes";
import SecondButton from "./SecondButton";

const PrincipalButtons = () => {
  const [posts, setPosts] = useState([]);
  const [commentingPostIndex, setCommentingPostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [user] = useState({ username: "admin" });
  const [authToken] = useState(localStorage.getItem("authToken")); // Obtener token desde localStorage


  // Función para cargar posts desde la API
  const fetchPosts = async () => {
    try {
      const response = await fetch(apiRoutes.listPosts, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
      });

      const responseText = await response.text();
      console.log("Respuesta del servidor:", responseText);

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(responseText);
        console.log(":D", data.posts);
        setPosts(data.posts); // Usar los datos de la respuesta
      } else {
        console.error("La respuesta no es JSON, es:", responseText);
      }
    } catch (error) {
      console.error("Error al cargar los posts:", error);
    }
  };

  // Llama a fetchPosts al montar el componente
  useEffect(() => {
    fetchPosts().then();
  }, []);

  const addPost = async (post) => {
    const postWithUser = {
      ...post,
      username: user.username,
      datetime: new Date().toLocaleString(),
      comments: [],
      likes: 0,
    };

    try {
      const response = await fetch(apiRoutes.publishPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({
          title: postWithUser.title,
          content: postWithUser.content,
        }),
      });

      const data = await response.json();
      console.log("API Response: ", data);

      if (response.ok) {
        await fetchPosts();
      } else {
        alert(`Error al publicar el post: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al intentar publicar el post:", error);
      alert("Error en la conexión a la API.");
    }
  };

  const generatePost = async () => {
    try {
      const response = await fetch(apiRoutes.generatePostAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();
      console.log("Respuesta de generar post: ", data);

      if (response.ok) {
        await fetchPosts();
      } else {
        alert(`Error al generar el post: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al intentar generar el post:", error);
      alert("Error en la conexión a la API.");
    }
  };

  const startCommenting = (index) => setCommentingPostIndex(index);

  const cancelComment = () => {
    setCommentingPostIndex(null);
    setNewComment("");
  };

  const publishComment = async () => {
    if (newComment.trim()) {
      const updatedPosts = [...posts];
      const postToUpdate = updatedPosts[commentingPostIndex];
    
      // Asegúrate de que el post tenga un arreglo de comentarios
      postToUpdate.comments = postToUpdate.comments || [];
    
      const newCommentData = {
        content: newComment,
        username: user.username,
        datetime: new Date().toLocaleString(),
      };
    
      postToUpdate.comments.push(newCommentData);
      setPosts(updatedPosts); // Actualizar el estado global de posts
      setNewComment("");
      setCommentingPostIndex(null);
    
      try {
        const response = await fetch(apiRoutes.publishComment, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
          body: JSON.stringify({
            id_post: postToUpdate.id_post,
            content: newComment,
          }),
        });
    
        const data = await response.json();
        if (!response.ok) {
          console.error("Error al publicar el comentario:", data.message);
          alert("Error al publicar el comentario.");
        } 

      } catch (error) {
        console.error("Error al intentar publicar el comentario:", error);
      }
    } else {
      alert("Por favor escribe un comentario.");
    }
  };
  
  
  

  const likePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes = (updatedPosts[index].likes || 0) + 1;
    setPosts(updatedPosts);
  };

  const deletePost = async (post) => {
    console.log(post);
    try {
      const response = await fetch(apiRoutes.deletePost, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({
          id_post: post.id_post,
          id_user: post.id_user,
          id_role: "admin",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el post");
      }

      const result = await response.json();
      console.log("Post eliminado:", result);
      await fetchPosts();
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          position: "absolute",
          top: "5px",
          left: "180px",
          display: "flex",
          gap: "25px",
        }}
      >
        <AddPostButton onAddPost={addPost} />
        <SecondButton funcioncita={generatePost} />
      </div>
      <div className="posts-container"
      >
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <Post
              key={index}
              post={post}
              onLike={() => likePost(index)}
              onComment={() => startCommenting(index)}
              isCommenting={commentingPostIndex === index}
              commentText={newComment}
              onCommentChange={(e) => setNewComment(e.target.value)}
              onPublishComment={publishComment}
              onCancelComment={cancelComment}
              onDeletePost={async () => {
                await deletePost(post);
              }}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
};

export default PrincipalButtons;
