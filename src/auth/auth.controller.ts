import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthBodyDto, AuthRefreshDto, IToken } from './auth.model';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService, private tokenService: TokenService) {}

    @Post('token')
    async auth(@Body() body: AuthBodyDto): Promise<IToken> {
        const payload = await this.userService.authorizeUser(body);
        return this.tokenService.createTokens(payload)
    }

    @Post('refresh')
    async refresh(@Body() body: AuthRefreshDto): Promise<IToken> {
        return this.tokenService.refreshToken(body.refresh, body.email)
    }
}
