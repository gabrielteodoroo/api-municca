import { Either, left, right } from '@/core/errors/either/either';
import { UserRepository } from '../repositories/user-repository';
import { TokenRepository } from '../services/token-repository';
import { InvalidCredentialsError } from '@/core/errors/custom-errors/invalid-credentials-error';
import User from '../entities/user';

type Request = {
  email: string;
  name: string;
};

type Response = Either<InvalidCredentialsError, { user: User; token: string }>;

export class AuthUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
  ) {}

  async handle({ email, name }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const token = this.tokenRepository.generate({
      id: user.id.toString(),
      name: user.name,
      email: user.email.value,
    });

    return right({ user, token });
  }
}
