import { Either, right } from '@/core/errors/either/either';
import { DocumentRepository } from '../repositories/document-repository';
import Document from '../entities/document';

type Request = {
  userId: string;
};

type Response = Either<null, Document[]>;

export class ListDocumentsUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async handle({ userId }: Request): Promise<Response> {
    const documents = await this.documentRepository.findManyByUserId(userId);

    return right(documents);
  }
}
