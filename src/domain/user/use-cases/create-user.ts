import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error';
import { Either, left, right } from '@/core/errors/either/either';
import User from '../entities/user';
import { InvalidEmailError } from '@/core/errors/custom-errors/invalid-email-error';
import { UserRepository } from '../repositories/user-repository';
import Email from '@/domain/shared/email';

type Request = {
  name: string;
  email: string;
};

type Response = Either<NotAllowedError | InvalidEmailError, User>;

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handle({ email, name }: Request): Promise<Response> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      return left(new NotAllowedError());
    }

    const userEmail = Email.create(email);

    if (!userEmail.validate()) {
      return left(new InvalidEmailError());
    }

    const user = User.create({ name, email: userEmail });

    await this.userRepository.create(user);

    return right(user);
  }
}
