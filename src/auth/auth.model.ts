import { UserRole } from "@prisma/client";

export interface IToken {
    token: string;
    refresh: string;
}

export interface IPayload {
    name: string;
    email: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}

export interface IAuthBody {
    email: string;
    password: string;
}