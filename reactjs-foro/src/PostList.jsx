import React from "react";
import Post from "./Post";

const PostList = ({ posts, onLike, onComment, commentingIndex, commentText, onCommentChange, onPublishComment, onCancelComment }) => {
    return (
        <div className="posts-container">
            {posts.map((post, index) => (
                <Post
                    key={post.id}
                    post={post}
                    onLike={() => onLike(index)}
                    onComment={() => onComment(index)}
                    isCommenting={commentingIndex === index}
                    commentText={commentText}
                    onCommentChange={onCommentChange}
                    onPublishComment={onPublishComment}
                    onCancelComment={onCancelComment}
                />
            ))}
        </div>
    );
};

export default PostList;
