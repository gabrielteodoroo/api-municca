import { UserRepository } from '@/domain/user/repositories/user-repository';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user';
import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { AuthUserUseCase } from '@/domain/user/use-cases/auth-user';
import { TokenRepository } from '@/domain/user/services/token-repository';
import { LoginController } from './controllers/login.controller';
import { CryptoModule } from '@/infra/crypto/crypto.module';

@Module({
  imports: [DatabaseModule, CryptoModule],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (UserRepository: UserRepository) => {
        return new CreateUserUseCase(UserRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: AuthUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        tokenRepository: TokenRepository,
      ) => {
        return new AuthUserUseCase(userRepository, tokenRepository);
      },
      inject: [UserRepository, TokenRepository],
    },
  ],
  controllers: [CreateUserController, LoginController],
})
export class UserModule {}
