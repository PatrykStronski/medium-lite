import { UserRole } from "src/users/users.model";

export interface IToken {
    token: string;
    refresh: string;
}

export interface IPayload {
    name: string;
    email: string;
    role: UserRole;
}

export interface IAuthBody {
    email: string;
    password: string;
}