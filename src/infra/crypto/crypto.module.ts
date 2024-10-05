import { Module } from '@nestjs/common';
import { JwtToken } from './jwt.service';
import { TokenRepository } from '@/domain/user/services/token-repository';

@Module({
  providers: [{ provide: TokenRepository, useClass: JwtToken }],
  exports: [TokenRepository],
})
export class CryptoModule {}
