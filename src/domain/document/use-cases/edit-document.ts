import { UserRepository } from '@/domain/user/repositories/user-repository';
import { DocumentRepository } from '../repositories/document-repository';
import { Either, left, right } from '@/core/errors/either/either';
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error';
import Document from '../entities/document';

type Request = {
  id: string;
  userId: string;
  name: string;
  status: string;
};

type Response = Either<NotFoundError, Document>;

export class EditDocumentUseCase {
  constructor(
    private documentRepository: DocumentRepository,
    private userRespository: UserRepository,
  ) {}

  async handle({ id, name, status, userId }: Request): Promise<Response> {
    const userExists = await this.userRespository.findById(userId);

    if (!userExists) {
      return left(new NotFoundError());
    }

    const document = await this.documentRepository.findById({ id, userId });

    if (!document) {
      return left(new NotFoundError());
    }

    document.name = name;
    document.status = status;

    await this.documentRepository.save(document);

    return right(document);
  }
}
