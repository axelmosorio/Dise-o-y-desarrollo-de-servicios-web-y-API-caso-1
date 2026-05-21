// Simulamos nuestra base de datos en memoria (ahora con let para poder modificarla)
let usuarios = [
    { username: 'admin', password: 'password123' }
];

//Controlador para iniciar sesión 
export const login = (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const usuarioEncontrado = usuarios.find(
        (u) => u.username === username && u.password === password
    );

    if (usuarioEncontrado) {
        return res.status(200).json({ message: '¡Autenticación satisfactoria! Bienvenido.' });
    } else {
        return res.status(401).json({ error: 'Credenciales incorrectas. Inténtalo de nuevo.' });
    }
};

//Controlador para Registrar Usuarios
export const registrar = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

// Validar si el usuario ya existe para que no se duplique
const existe = usuarios.find((u) => u.username === username);
    if (existe) {
        return res.status(400).json({ error: 'El nombre de usuario ya está registrado.' });
    }

  // Guardar el nuevo usuario en nuestra lista
    usuarios.push({ username, password });
    return res.status(201).json({ message: '¡Usuario registrado con éxito! Ya puedes iniciar sesión.' });
};