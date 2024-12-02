import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            res.status(400).json({ msg: 'El correo ya está registrado' });
            return;
        }

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        const usuario = await Usuario.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ msg: 'Usuario registrado con éxito', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar el usuario' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
            return;
        }

        const validPassword = bcrypt.compareSync(password, usuario.get('password') as string);
        if (!validPassword) {
            res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
            return;
        }

        const token = jwt.sign({ id: usuario.get('id') }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '4h',
        });

        res.json({ msg: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }
};
