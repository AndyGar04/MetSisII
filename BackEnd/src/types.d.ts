import { JwtUserPayload } from "./common/security";

declare global {
    namespace Express {
        interface Request {
        user?: JwtUserPayload;
        }
    }
}