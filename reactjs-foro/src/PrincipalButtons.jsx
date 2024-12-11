import React, { useState } from "react";
import Header from "./Header";
import Post from "./Post";
import AddPostButton from "./AddPostButton";

const PrincipalButtons = () => {
    const [posts, setPosts] = useState([]);
    const [commentingPostIndex, setCommentingPostIndex] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [user] = useState({ username: "admin" });

    const addPost = (post) => {
        const postWithUser = {
            ...post,
            username: user.username,
            datetime: new Date().toLocaleString(),
            comments: [],
            likes: 0,
        };
        setPosts([...posts, postWithUser]); // Add post to the list
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

    return (
        <div>
            <Header />
            <AddPostButton onAddPost={addPost} />
            <div className="posts-container">
                {posts.map((post, index) => (
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
                    />
                ))}
            </div>
        </div>
    );
};

export default PrincipalButtons;
