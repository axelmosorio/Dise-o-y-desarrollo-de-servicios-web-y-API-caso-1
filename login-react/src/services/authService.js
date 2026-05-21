const API_URL = 'http://localhost:3000/api';

export const loginUsuario = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        return { ok: response.ok, data };
    } catch (error) {
        return { ok: false, data: { error: 'Error de conexión con el servidor.' } };
    }
};

// NUEVA FUNCIÓN PARA EL REGISTRO
export const registrarUsuario = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/registrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        return { ok: response.ok, data };
    } catch (error) {
        return { ok: false, data: { error: 'Error de conexión al registrar.' } };
    }
};