import React, { useState, useEffect } from "react";
import Header from "./Header";
import Post from "./Post";
import AddPostButton from "./AddPostButton";
import apiRoutes from "./apiRoutes";

const PrincipalButtons = () => {
    const [posts, setPosts] = useState([]);
    const [commentingPostIndex, setCommentingPostIndex] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [user] = useState({ username: "admin" });
    const [authToken] = useState(localStorage.getItem("authToken")); // Obtener token desde localStorage

    // Función para cargar posts desde la API
    // Función para cargar posts desde la API
    const fetchPosts = async () => {
        try {
            const response = await fetch(apiRoutes.list_posts, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${authToken}`,
                },
            });

            // Imprimir la respuesta como texto primero
            const responseText = await response.text();
            console.log("Respuesta del servidor:", responseText);

            // Verificar si la respuesta es JSON
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const data = JSON.parse(responseText);
                console.log(":D", data.posts);
                setPosts(data.posts);  // Usar los datos de la respuesta
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

    const startCommenting = (index) => setCommentingPostIndex(index);

    const cancelComment = () => {
        setCommentingPostIndex(null);
        setNewComment("");
    };

    const publishComment = () => {
        if (newComment.trim()) {
            const updatedPosts = [...posts];
            updatedPosts[commentingPostIndex].comments.push({
                text: newComment,
                username: user.username,
                datetime: new Date().toLocaleString(),
            });
            setPosts(updatedPosts);
            setNewComment("");
            setCommentingPostIndex(null);
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
        console.log(post)
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
    }

    return (
        <>
            <Header />
            <AddPostButton onAddPost={addPost} />
            <div className="posts-container">
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
                            onDeletePost={async () => { await deletePost(post) }}
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
