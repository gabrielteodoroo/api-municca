import { Either, left, right } from '@/core/errors/either/either';
import { UserRepository } from '../repositories/user-repository';
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error';
import { DocumentRepository } from '@/domain/document/repositories/document-repository';

type Request = {
  id: string;
};

type Response = Either<NotFoundError, boolean>;

export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private documentRepository: DocumentRepository,
  ) {}

  async handle({ id }: Request): Promise<Response> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new NotFoundError());
    }

    const documents = await this.documentRepository.findManyByUserId(id);

    if (documents.length > 0) {
      await this.documentRepository.deleteManyByUserId(id);
    }

    await this.userRepository.delete(id);

    return right(true);
  }
}
