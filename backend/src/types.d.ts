import { JwtPayload } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Add `user` field to the Request object
    }
  }
}
