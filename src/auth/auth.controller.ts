import { Body, Controller, Post } from '@nestjs/common';
import { IAuthBody, IToken } from './auth.model';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private users: UsersService) {}

    @Post()
    token(@Body() body: IAuthBody): IToken {
        
    }
}
