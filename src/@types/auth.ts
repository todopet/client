import type { User } from "./user";

export interface AuthResponse {
  user: User;
  token?: string;
  expiresAt?: Date;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface AuthError {
  code: string;
  message: string;
}
