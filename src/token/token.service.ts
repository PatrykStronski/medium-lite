import { Injectable, UnauthorizedException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { IPayload, IToken, TokenType } from 'src/auth/auth.model';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { GraphQLError } from 'graphql';

@Injectable()
export class TokenService {
    private privateKey = readFileSync('src/keys/key.pem', 'utf8');
    private publicKey = readFileSync('src/keys/public.pem', 'utf8');

    createTokens(payload: IPayload): IToken {
        try {
            const token = jwt.sign({ ...payload, type: TokenType.standard }, this.privateKey, { algorithm: 'RS256', expiresIn: '1h' });
            const refresh = jwt.sign({ email: payload.email, type: TokenType.refresh }, this.privateKey, { algorithm: 'RS256', expiresIn: '1d' });
            return { token, refresh };
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException({ message: 'Could not authorize the user' })
        }
    }

    refreshToken(refresh: string, email: string): IToken {
        const payload = jwt.verify(refresh, 'secret') as IPayload;
        if (payload.email !== email) {
            throw new UnauthorizedException({ message: 'Email in payload and body not matching' });
        }
        try {
            const token = jwt.sign({ email: payload.email, name: payload.name, role: payload.role }, this.privateKey, { algorithm: 'RS256', expiresIn: '1h' });
            return {
                token
            }
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException({ message: 'Invalid refresh token' })
        }
    }

    verifyToken(token: string) {
        let payload;
        try {
            payload = jwt.verify(token, this.publicKey) as IPayload;
        } catch (e) {
            console.error(e);
            throw new GraphQLError('cannot authorize jwt', { extensions: { code: '401' }});
        }
        if (payload.type === TokenType.refresh) {
            throw new GraphQLError('cannot authorize with refresh token', { extensions: { code: '401' }});
        }
        return payload;
    }

    extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
