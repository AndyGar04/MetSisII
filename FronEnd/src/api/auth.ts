const API_URL = 'http://localhost:3000';

interface LoginResponse {
    user: {
        id: string,
        name: string,
        email: string,
        role: "admin" | "user"
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export async function loginReq(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        throw new Error('Error al loguearse');
    }

    const data: LoginResponse = await res.json();
    return data;
}