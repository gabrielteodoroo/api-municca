import Document from '@/domain/document/entities/document';
import { DocumentRepository } from '@/domain/document/repositories/document-repository';

export class InMemoryDocumentRepository extends DocumentRepository {
  items: Document[] = [];

  async create(document: Document) {
    this.items.push(document);
    return document;
  }

  async findManyByUserId(userId: string): Promise<Document[]> {
    return this.items.filter(
      (document) => document.user.id.toString() === userId,
    );
  }

  async findById({ id, userId }: { id: string; userId: string }) {
    const document = this.items.find(
      (document) =>
        document.id.toString() === id && document.user.id.toString() === userId,
    );

    if (!document) {
      return null;
    }

    return document;
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === id && item.user.id.toString() === userId,
    );

    this.items.splice(itemIndex, 1);
  }
}
