import React, { useEffect, useState } from 'react';
import { getLibros, deleteLibro } from '../../services/libroService';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function LibroList() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await getLibros();
        setLibros(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLibros();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteLibro(id);
      setLibros(libros.filter(libro => libro.id !== id));
    } catch (err) {
      setError('Error al eliminar el libro');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Libros
      </Typography>
      <Button 
        component={Link} 
        to="/libros/nuevo" 
        variant="contained" 
        color="primary"
        sx={{ mb: 3 }}
      >
        Nuevo Libro
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Disponible</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros.map((libro) => (
              <TableRow key={libro.id}>
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.autor?.nombre}</TableCell>
                <TableCell>{libro.genero?.nombre}</TableCell>
                <TableCell>{libro.disponible ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  <IconButton 
                    component={Link} 
                    to={`/libros/editar/${libro.id}`}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDelete(libro.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default LibroList;