import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import api from '../services/api';
import { Box, Typography, Paper } from '@mui/material';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Estadisticas() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/estadisticas');
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!stats) return null;

  // Datos para gráfico de libros por género
  const librosPorGeneroData = {
    labels: stats.libros_por_genero.map(item => item.genero),
    datasets: [{
      label: 'Libros por Género',
      data: stats.libros_por_genero.map(item => item.total),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    }]
  };

  // Datos para gráfico de disponibilidad
  const disponibilidadData = {
    labels: ['Disponibles', 'Prestados'],
    datasets: [{
      data: [stats.libros_disponibles, stats.libros_prestados],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
    }]
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Estadísticas de la Biblioteca
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Paper sx={{ p: 2, width: '100%', maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Libros por Género
          </Typography>
          <Bar 
            data={librosPorGeneroData} 
            options={{ responsive: true }} 
            height={300}
          />
        </Paper>
        
        <Paper sx={{ p: 2, width: '100%', maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Disponibilidad de Libros
          </Typography>
          <Pie 
            data={disponibilidadData} 
            options={{ responsive: true }} 
            height={300}
          />
        </Paper>
      </Box>
    </Container>
  );
}

export default Estadisticas;