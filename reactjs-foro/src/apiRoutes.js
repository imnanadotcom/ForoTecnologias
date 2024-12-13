

const API_BASE_URL = "http://127.0.0.1:5000/";
const USERS = "users/";
const POSTS = "posts/";
const BOT = "bot/";
const POST_LIKES = "post_likes/";
const COMMENTS = "comments/";

const apiRoutes = {
  signUp: `${API_BASE_URL}${USERS}register`,         // Registro de usuario
  login: `${API_BASE_URL}${USERS}login`,             // Login de usuario
  publishPost: `${API_BASE_URL}${POSTS}publish_post`, // Endpoint para publicar un post
  showPosts: `${API_BASE_URL}${POSTS}show_post`,     // Endpoint para mostrar un post
  listPosts: `${API_BASE_URL}${POSTS}list_posts`,    // Endpoint para listar los posts
  updatePost: `${API_BASE_URL}${POSTS}update_post`,  // Endpoint para actualizar un post
  deletePost: `${API_BASE_URL}${POSTS}delete_post`,  // Endpoint para eliminar un post
  generatePostAPI: `${API_BASE_URL}${BOT}generate_post`, // Endpoint del bot para generar un post
  likePost: `${API_BASE_URL}${POST_LIKES}like_post`, // Endpoint para dar like a un post
  unlikePost: `${API_BASE_URL}${POST_LIKES}unlike_post`, // Endpoint para quitar like de un post
  likesByPost: `${API_BASE_URL}${POST_LIKES}likes_by_post`, // Mostrar likes por post
  likesByUser: `${API_BASE_URL}${POST_LIKES}likes_by_user`,  // Mostrar likes por usuario
  isLikedByUser: `${API_BASE_URL}${POST_LIKES}is_liked`, // Verificar si el usuario ha dado like
  publishComment: `${API_BASE_URL}${COMMENTS}publish_comment`, // Publicar un comentario
  editComment: `${API_BASE_URL}${COMMENTS}edit_comment`, // Editar un comentario
  deleteComment: `${API_BASE_URL}${COMMENTS}delete_comment`, // Eliminar un comentario
  commentsByUser: `${API_BASE_URL}${COMMENTS}comments_by_user`, // Obtener comentarios por usuario
  commentsByPost: `${API_BASE_URL}${COMMENTS}comments_by_post`, // Obtener comentarios por post
};

export default apiRoutes;
