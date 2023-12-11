import { UserRole } from "@prisma/client";
import { IsEmail, IsString } from "class-validator";

export enum TokenType {
    refresh,
    standard
}

export interface IToken {
    token: string;
    refresh?: string;
}

export interface IPayload {
    type?: TokenType; 
    userId?: number;
    name: string;
    email: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}

export class AuthBodyDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class AuthRefreshDto {
    @IsEmail()
    email: string;
    
    @IsString()
    refresh: string;
}