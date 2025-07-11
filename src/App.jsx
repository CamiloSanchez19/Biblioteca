import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LibroList from './components/Libro/LibroList';
import LibroForm from './components/Libro/LibroForm';
import PrestamoList from './components/Prestamo/PrestamoList';
import Estadisticas from './components/Estadisticas';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Normaliza los estilos básicos */}
      <Container maxWidth="lg"> {/* Contenedor principal con ancho máximo */}
        <Routes>
          <Route path="/" element={<LibroList />} />
          <Route path="/libros" element={<LibroList />} />
          <Route path="/libros/nuevo" element={<LibroForm />} />
          <Route path="/libros/editar/:id" element={<LibroForm />} />
          <Route path="/prestamos" element={<PrestamoList />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;