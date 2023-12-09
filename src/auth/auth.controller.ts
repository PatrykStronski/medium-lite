import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { IAuthBody, IToken } from './auth.model';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService, private tokenService: TokenService) {}

    @Post()
    async auth(@Body() body: IAuthBody): Promise<IToken> {
        try {
            const payload = await this.userService.authorizeUser(body);
            console.log(payload)
            return this.tokenService.createTokens(payload)
        } catch(e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }
}
