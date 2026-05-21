import { useState } from 'react';
import { loginUsuario, registrarUsuario } from './services/authService';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Estado para controlar qué formulario ver en pantalla
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isLoginView) {
      // Flujo de Login
      const resultado = await loginUsuario(username, password);
      if (resultado.ok) {
        setIsSuccess(true);
        setMessage(resultado.data.message);
      } else {
        setIsSuccess(false);
        setMessage(resultado.data.error);
      }
    } else {
      // Flujo de Registro
      const resultado = await registrarUsuario(username, password);
      if (resultado.ok) {
        setIsSuccess(true);
        setMessage(resultado.data.message);
        // Limpiamos los campos tras registrar con éxito
        setUsername('');
        setPassword('');
      } else {
        setIsSuccess(false);
        setMessage(resultado.data.error);
      }
    }
  };

  // Función para alternar entre vistas limpiando los mensajes viejos
  const switchView = () => {
    setIsLoginView(!isLoginView);
    setMessage('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-card">
      <h2>{isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">
          {isLoginView ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>

      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* Enlace para cambiar entre Login y Registro */}
      <p className="switch-text">
        {isLoginView ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <span onClick={switchView}>
          {isLoginView ? 'Regístrate aquí' : 'Inicia sesión'}
        </span>
      </p>
    </div>
  );
}

export default App;