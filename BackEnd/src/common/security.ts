import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtUserPayload {
    id: string;
    email: string;
    role: "admin" | "user";
}

export const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 15 * 60

export const comparePassword = (plain: string, stored: string): boolean => {
    return plain === stored;
}

export const signAccessToken = (payload: JwtUserPayload): string => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error('JWT_ACCESS_SECRET no está definido en las variables de entorno');
    }
    const expiresIn = process.env.JWT_ACCESS_EXPIRES || '15m';
    return jwt.sign(payload, secret, { expiresIn } as SignOptions);
}

export const signRefreshToken = (payload: JwtUserPayload): string => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw new Error('JWT_REFRESH_SECRET no está definido en las variables de entorno');
    }
    const expiresIn = process.env.JWT_REFRESH_EXPIRES || '7d';
    return jwt.sign(payload, secret, { expiresIn } as SignOptions);
}

export const verifyRefreshToken = (token: string): JwtUserPayload => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw new Error('JWT_REFRESH_SECRET no está definido en las variables de entorno');
    }
    try {
        const decoded = jwt.verify(token, secret);
        return decoded as JwtUserPayload;
    } catch (err) {
        throw new Error('Token inválido o expirado');
    }
}

export const verifyAccessToken = (token: string): JwtUserPayload => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error('JWT_ACCESS_SECRET no está definido en las variables de entorno');
    }
    try {
        const decoded = jwt.verify(token, secret);
        return decoded as JwtUserPayload;
    } catch (err) {
        throw new Error('Access Token inválido o expirado');
    }
}