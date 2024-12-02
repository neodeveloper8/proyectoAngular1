import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.body.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token no válido' });
    }
};
