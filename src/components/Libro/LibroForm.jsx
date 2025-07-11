import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLibro, createLibro, updateLibro } from '../../services/libroService';
import { getAutores } from '../../services/autorService';
import { getGeneros } from '../../services/generoService';
import { TextField, Button, Container, Typography, MenuItem, FormControl, InputLabel, Select, Box, CircularProgress, Alert } from '@mui/material';

function LibroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState({
    titulo: '',
    autor_id: '',
    genero_id: '',
    disponible: true
  });
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [autoresRes, generosRes] = await Promise.all([
          getAutores(),
          getGeneros()
        ]);
        
        setAutores(autoresRes.data);
        setGeneros(generosRes.data);
        
        if (id) {
          const libroRes = await getLibro(id);
          setLibro(libroRes.data);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLibro(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (id) {
        await updateLibro(id, libro);
      } else {
        await createLibro(libro);
      }
      navigate('/libros');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el libro');
      setIsSubmitting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? 'Editar Libro' : 'Nuevo Libro'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Título"
          name="titulo"
          value={libro.titulo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Autor</InputLabel>
          <Select
            name="autor_id"
            value={libro.autor_id}
            onChange={handleChange}
            label="Autor"
          >
            {autores.map((autor) => (
              <MenuItem key={autor.id} value={autor.id}>
                {autor.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Género</InputLabel>
          <Select
            name="genero_id"
            value={libro.genero_id}
            onChange={handleChange}
            label="Género"
          >
            {generos.map((genero) => (
              <MenuItem key={genero.id} value={genero.id}>
                {genero.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box sx={{ mt: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Guardar'}
          </Button>
          <Button 
            component={Link}
            to="/libros"
            variant="outlined"
            sx={{ ml: 2 }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LibroForm;