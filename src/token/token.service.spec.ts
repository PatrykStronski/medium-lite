import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { UserRole } from '@prisma/client';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('Ciphered token with private key should be verified with public key', () => {
    const payload = {
      email: '1@2',
      name: '1',
      role: UserRole.user
    }
    const tokens = service.createTokens(payload);
    let err;
    try {
      service.verifyToken(tokens.token);
    } catch (e) {
      err = e;
    }
    expect(err).toBeUndefined();
  });
});
