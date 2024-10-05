import { Either, left, right } from '@/core/errors/either/either';
import { DocumentRepository } from '../repositories/document-repository';
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error';
import Document from '../entities/document';

type Request = {
  id: string;
  userId: string;
};

type Response = Either<NotFoundError, Document>;

export class GetDocumentUseCase {
  constructor(private documentRepository: DocumentRepository) {}

  async handle({ id, userId }: Request): Promise<Response> {
    const document = await this.documentRepository.findById({ id, userId });

    if (!document) {
      return left(new NotFoundError());
    }

    return right(document);
  }
}
