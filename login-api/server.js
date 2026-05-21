import express from 'express';
import cors from 'cors';
import { login, registrar } from './controllers/authController.js'; // Importamos las funciones del controlador

const app = express();
const PORT = 3000;

app.use(cors());          // Habilita que React se comunique con la API sin bloqueos
app.use(express.json());  // Permite que la API entienda JSON enviado en el body

// ENDPOINTS: Las rutas reciben la petición y delegan el trabajo al controlador
app.post('/api/login', login);
app.post('/api/registrar', registrar);

// Enciende el servidor una sola vez
app.listen(PORT, () => {
    console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});