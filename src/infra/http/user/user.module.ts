import { UserRepository } from '@/domain/user/repositories/user-repository';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user';
import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { AuthUserUseCase } from '@/domain/user/use-cases/auth-user';
import { TokenRepository } from '@/domain/user/services/token-repository';
import { LoginController } from './controllers/login.controller';
import { CryptoModule } from '@/infra/crypto/crypto.module';
import { ListUsersUseCase } from '@/domain/user/use-cases/list-users';
import { ListUsersController } from './controllers/list-users.controller';
import { GetUserUseCase } from '@/domain/user/use-cases/get-user';
import { GetUserController } from './controllers/get-user.controller';
import { EditUserUseCase } from '@/domain/user/use-cases/edit-user';
import { EditUserController } from './controllers/edit-user.controller';
import { DeleteUserUseCase } from '@/domain/user/use-cases/delete-user';
import { DeleteUserController } from './controllers/delete-user.controller';
import { DocumentRepository } from '@/domain/document/repositories/document-repository';

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
    {
      provide: ListUsersUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new ListUsersUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: GetUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new GetUserUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: EditUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new EditUserUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        documentRepository: DocumentRepository,
      ) => {
        return new DeleteUserUseCase(userRepository, documentRepository);
      },
      inject: [UserRepository, DocumentRepository],
    },
  ],
  controllers: [
    CreateUserController,
    LoginController,
    ListUsersController,
    GetUserController,
    EditUserController,
    DeleteUserController,
  ],
})
export class UserModule {}
