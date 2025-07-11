import api from './api';

// Obtener todos los autores
export const getAutores = () => api.get('/autores');

// Obtener un autor por ID
export const getAutor = (id) => api.get(`/autores/${id}`);

// Crear un nuevo autor
export const createAutor = (autorData) => api.post('/autores', autorData);

// Actualizar un autor existente
export const updateAutor = (id, autorData) => api.put(`/autores/${id}`, autorData);

// Eliminar un autor
export const deleteAutor = (id) => api.delete(`/autores/${id}`);