import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IPayload } from 'src/auth/auth.model';

@Injectable()
export class UserActivateGuard implements CanActivate {
    constructor(private tokenService: TokenService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = GqlExecutionContext.create(context).getContext().req;
        const token = this.tokenService.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        const payload = await this.tokenService.verifyToken(token) as IPayload;
        request['user'] = payload;
        return true;
    }
}