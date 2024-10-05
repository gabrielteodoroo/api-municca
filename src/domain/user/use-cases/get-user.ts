import { Either, left, right } from '@/core/errors/either/either';
import { UserRepository } from '../repositories/user-repository';
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error';
import User from '../entities/user';

type Request = {
  id: string;
};

type Response = Either<NotFoundError, User>;

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotFoundError());
    }

    return right(user);
  }
}
