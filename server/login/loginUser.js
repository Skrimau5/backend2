// server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Simulación de datos de usuario (normalmente se almacenan en una base de datos)
const users = [
  {
    username: 'usuario',
    passwordHash: 'manuel123', // contraseña: contraseña
  },
];

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Buscar al usuario en la lista de usuarios
  const user = users.find((user) => user.username === username);

  // Verificar si el usuario existe y si la contraseña coincide
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    // Generar un token de autenticación
    const token = jwt.sign({ username }, 'clave-secreta', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
