import { UserRepository } from '@/domain/user/repositories/user-repository';
import { DocumentRepository } from '../repositories/document-repository';
import { Either, left, right } from '@/core/errors/either/either';
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error';

type Request = {
  id: string;
  userId: string;
};

type Response = Either<NotFoundError, boolean>;

export class DeleteDocumentUseCase {
  constructor(
    private documentRepository: DocumentRepository,
    private userRepository: UserRepository,
  ) {}

  async handle({ id, userId }: Request) {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      return left(new NotFoundError());
    }

    const document = await this.documentRepository.findById({ id, userId });

    if (!document) {
      return left(new NotFoundError());
    }

    await this.documentRepository.delete({ id, userId });

    return right(true);
  }
}
