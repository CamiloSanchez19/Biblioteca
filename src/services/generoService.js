import api from './api';

// Obtener todos los géneros
export const getGeneros = () => api.get('/generos');

// Obtener un género por ID
export const getGenero = (id) => api.get(`/generos/${id}`);

// Crear un nuevo género
export const createGenero = (generoData) => api.post('/generos', generoData);

// Actualizar un género existente
export const updateGenero = (id, generoData) => api.put(`/generos/${id}`, generoData);

// Eliminar un género
export const deleteGenero = (id) => api.delete(`/generos/${id}`);