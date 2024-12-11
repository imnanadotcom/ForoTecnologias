// src/apiRoutes.js

const API_BASE_URL = "http://127.0.0.1:5000/";
const USERS = "users/";
const POSTS = "posts/";

const apiRoutes = {
  signUp: `${API_BASE_URL}${USERS}register`,         // Registro de usuario
  login: `${API_BASE_URL}${USERS}login`,             // Login de usuario
  publishPost: `${API_BASE_URL}${POSTS}publish_post`, // Endpoint para publicar un post
  showPosts: `${API_BASE_URL}${POSTS}show_post`,      // Endpoint para mostrar un post
  list_posts: `${API_BASE_URL}${POSTS}list_posts`,      // Endpoint para mostrar un post
  updatePost: `${API_BASE_URL}${POSTS}update_post`,  // Endpoint para actualizar un post
  deletePost: `${API_BASE_URL}${POSTS}delete_post`,  // Endpoint para eliminar un post
};

export default apiRoutes;
