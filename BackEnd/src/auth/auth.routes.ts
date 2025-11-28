import { Router } from 'express';
import { loginHandler, refreshHandler } from './auth.controller';

const authRoute = Router();

// Ruta para login
// /auth/login
authRoute.post('/login', loginHandler);
// Ruta para refresh token
// /auth/refresh
authRoute.post('/refresh', refreshHandler);

export default authRoute;