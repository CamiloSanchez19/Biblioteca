import api from './api';

// Obtener todos los libros
export const getLibros = () => api.get('/libros');

// Obtener un libro por ID
export const getLibro = (id) => api.get(`/libros/${id}`);

// Crear un nuevo libro
export const createLibro = (libroData) => api.post('/libros', libroData);

// Actualizar un libro existente
export const updateLibro = (id, libroData) => api.put(`/libros/${id}`, libroData);

// Eliminar un libro
export const deleteLibro = (id) => api.delete(`/libros/${id}`);