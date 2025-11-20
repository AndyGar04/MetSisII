import { buscarUsuarioPorEmail, User, UserRole } from "./auth.mock";
import { comparePassword, signAccessToken, signRefreshToken, verifyRefreshToken, JwtUserPayload } from "../common/security";

export interface PublicUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface LoginResult {
    user: PublicUser;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}

export interface RefreshResult {
    accessToken: string;
    expiresIn: number;
}

// SE USA PARA NO DEVOLVER LA CONTRASEÑA AL FRONT

const mapToPublicUser = (user: User): PublicUser => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
});

// --LOGIN--

export const login = async (email: string, password: string): Promise<LoginResult> => {
    const user = await buscarUsuarioPorEmail(email);
    if (!user) {
        throw new Error('Los credenciales son invalidos');
    }
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Los credenciales son invalidos');
    }
    const payload: JwtUserPayload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    const expiresIn = process.env.JWT_ACCESS_EXPIRES ? parseInt(process.env.JWT_ACCESS_EXPIRES) : 15 * 60;
    return {
        user: mapToPublicUser(user),
        accessToken,
        expiresIn, 
        refreshToken
    };
}


// --REFRESH TOKEN--

export const refresh = (refreshToken: string): RefreshResult => {
    const payload = verifyRefreshToken(refreshToken);

    const newAccessToken = signAccessToken({
        id: payload.id,
        email: payload.email,
        role: payload.role
    });
    return {
        accessToken: newAccessToken,
        expiresIn: process.env.JWT_ACCESS_EXPIRES ? parseInt(process.env.JWT_ACCESS_EXPIRES) : 15 * 60
    };
}
