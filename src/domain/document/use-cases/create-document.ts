import { Either, left, right } from '@/core/errors/either/either';
import { DocumentRepository } from '../repositories/document-repository';
import Document from '../entities/document';
import { UserRepository } from '@/domain/user/repositories/user-repository';
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error';

type Request = {
  userId: string;
  name: string;
  status: string;
};

type Response = Either<NotFoundError, Document>;

export class CreateDocumentUseCase {
  constructor(
    private documentRepository: DocumentRepository,
    private userRepository: UserRepository,
  ) {}

  async handle({ name, status, userId }: Request): Promise<Response> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      return left(new NotFoundError());
    }

    const document = Document.create({
      name,
      status,
      userId,
    });

    await this.documentRepository.create(document);

    return right(document);
  }
}
