import React, { useState } from 'react';

const CommentList = ({ comments, currentUserId, handleDeleteComment }) => {
  const [editingComment, setEditingComment] = useState(null); // Para saber qué comentario está en edición
  const [editedContent, setEditedContent] = useState(''); // Para guardar el contenido editado

  // Función para habilitar el modo de edición
  const handleEditComment = (comment) => {
    setEditingComment(comment.id); // Establecer el comentario que estamos editando
    setEditedContent(comment.content); // Establecer el contenido en el estado
  };

  // Función para manejar el cambio en el campo de texto
  const handleChangeEdit = (e) => {
    setEditedContent(e.target.value); // Actualizar el contenido editado
  };

  return (
    <div className="comments" style={{ maxHeight: "200px", overflowY: "scroll" }}>
      {comments && comments.length > 0 ? (
        comments.map((comment, idx) => (
          <div key={idx} className="comment">
            {editingComment === comment.id ? (
              // Modo edición
              <textarea
                value={editedContent}
                onChange={handleChangeEdit}
                rows="3"
                cols="50"
              />
            ) : (
              // Modo vista
              <p dangerouslySetInnerHTML={{ __html: comment.content }} />
            )}
            <span>{comment.username}</span>
            {comment.username === currentUserId && (
              <div>
                {editingComment === comment.id ? (
                  // Si estamos editando, mostrar el botón de cancelar o guardar
                  <button
                    className="btn-save-comment"
                    onClick={() => {
                      // Aquí podrías hacer algo cuando termines de editar, por ahora solo deshabilitamos el modo edición
                      setEditingComment(null);
                    }}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="btn-edit-comment"
                    onClick={() => handleEditComment(comment)}
                  >
                    Editar
                  </button>
                )}
                <button
                  className="btn-delete-comment"
                  onClick={() => handleDeleteComment(comment)}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
