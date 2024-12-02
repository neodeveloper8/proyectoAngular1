"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const usuarioExistente = yield usuario_1.default.findOne({ where: { email } });
        if (usuarioExistente) {
            res.status(400).json({ msg: 'El correo ya está registrado' });
            return;
        }
        const salt = bcryptjs_1.default.genSaltSync();
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        const usuario = yield usuario_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ msg: 'Usuario registrado con éxito', usuario });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar el usuario' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ where: { email } });
        if (!usuario) {
            res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
            return;
        }
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.get('password'));
        if (!validPassword) {
            res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.get('id') }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '4h',
        });
        res.json({ msg: 'Inicio de sesión exitoso', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }
});
exports.login = login;
