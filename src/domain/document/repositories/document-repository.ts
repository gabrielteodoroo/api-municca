import { Either } from '@/core/errors/either/either';
import Document from '../entities/document';

type Response = Either<null, Document[]>;

export abstract class DocumentRepository {
  abstract create(document: Document): Promise<Document>;
  abstract findManyByUserId(userId: string): Promise<Document[]>;
  abstract findById({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<Document | null>;
  abstract delete({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<void>;
  abstract save(document: Document): Promise<void>;
  abstract deleteManyByUserId(userId: string): Promise<void>;
}
