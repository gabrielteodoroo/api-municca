import { Either, left, right } from '@/core/errors/either/either';
import { UserRepository } from '../repositories/user-repository';
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error';
import User from '../entities/user';
import { InvalidEmailError } from '@/core/errors/custom-errors/invalid-email-error';
import Email from '@/domain/shared/email';

type Request = {
  id: string;
  name: string;
  email: string;
};

type Response = Either<NotFoundError | InvalidEmailError, User>;

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handle({ email, id, name }: Request): Promise<Response> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotFoundError());
    }

    const userEmail = Email.create(email);

    if (!userEmail.validate()) {
      return left(new InvalidEmailError());
    }

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists && emailExists.id.toString() !== id) {
      return left(new InvalidEmailError());
    }

    user.name = name;
    user.email = userEmail;

    await this.userRepository.save(user);

    return right(user);
  }
}
