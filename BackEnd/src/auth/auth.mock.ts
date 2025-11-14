export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string; 
}


const staticUser: User = {
  id: '1',
  name: 'Admin',
  email: 'admin@admin.com',
  role: 'admin',
  password: 'admin123' 
};

export const buscarUsuarioPorEmail = async (email: string): Promise<User | null> => {
    if (email === staticUser.email) {
        return staticUser;
    }
    return null;
};
