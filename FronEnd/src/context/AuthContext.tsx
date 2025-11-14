import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loginReq } from "../api/auth";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
}

interface AuthContextValue {
    user: User | null;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        const storedToken = localStorage.getItem("accessToken");
        if (storedUserData && storedToken) {
            setUser(JSON.parse(storedUserData));
            setAccessToken(storedToken);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const { user, accessToken } = await loginReq(email, password);
        setUser(user);
        setAccessToken(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
    }

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    }

    const value: AuthContextValue = { user, accessToken, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}