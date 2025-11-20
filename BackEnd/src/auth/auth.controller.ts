import { Request, Response } from "express";
import { authSchema } from "./auth.schemas";
import { login, refresh } from "./auth.service";

// POST DE LOGIN
// /auth/login

export const loginHandler = async (req: Request, res: Response) => {
    const result = authSchema.safeParse(req.body);

    if (!result.success){
        return res.status(400).json({
            message: "Datos de autenticacion invalidos",
            errors: result.error.flatten()
        });
    }

    const { email, password } = result.data;

    try {
        const { user, accessToken, expiresIn, refreshToken } = await login(email, password);
        return res.status(200).json({
            user,
            accessToken,
            expiresIn,
            refreshToken
        });
    } catch (error) { 
        return res.status(401).json({
            message: "Los credenciales son invalidos"
        });
    }
}


// POST DE REFRESH TOKEN
// /auth/refresh

export const refreshHandler = (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if(!refreshToken || typeof refreshToken !== 'string') {
        return res.status(400).json({
            message: "Refresh token es requerido y debe ser una cadena"
        });
    }

    try {
        const { accessToken, expiresIn } = refresh(refreshToken);

        return res.status(200).json({ accessToken, expiresIn });
    } catch (error) {
        return res.status(401).json({
            message: "Refresh token invalido"
        });
    }
}