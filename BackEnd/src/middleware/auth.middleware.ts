import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../common/security';
import { AuthenticationError } from '../common/errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization; 

        if (!authHeader) {
            throw new AuthenticationError("No se proporciono token de autenticacion");
        }

        const token = authHeader.split(' ')[1]; 
        
        if (!token) {
            throw new AuthenticationError("Formato de token invalido");
        }

        const userPayload = verifyAccessToken(token);

        req.user = userPayload;

        next();

    } catch (error) {
        if (error instanceof AuthenticationError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(401).json({ message: "Token invalido o expirado" });
    }
};