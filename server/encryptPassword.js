const bcrypt = require('bcryptjs');

// Contraseña que deseas encriptar
const password = '$2a$10$WqDPhvynCzZfJrD4WczIOuEj.g4H5hgMwXnMptLi82mW2Zfks4heK'; // Cambia esto por la contraseña deseada

// Generar el hash
const salt = bcrypt.genSaltSync(10); // Genera el salt
const hashedPassword = bcrypt.hashSync(password, salt); // Encripta la contraseña

console.log(`Contraseña original: ${password}`);
console.log(`Contraseña encriptada: ${hashedPassword}`);
    