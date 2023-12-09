import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { IPayload, IToken } from 'src/auth/auth.model';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class TokenService {
    private privateKey = readFileSync('src/keys/id_rsa.key', 'utf8');
    private publicKey = readFileSync('src/keys/id_rsa.pub.key', 'utf8');

    createTokens(payload: IPayload): IToken {
        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
        const refresh = jwt.sign(payload, 'secret', { expiresIn: '1d' });
        return { token, refresh };
    }

    verifyToken(token: string) {
        return jwt.verify(token, 'secret');
    }
    extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
