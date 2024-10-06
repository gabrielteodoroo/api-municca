import Document from '@/domain/document/entities/document';
import { DocumentRepository } from '@/domain/document/repositories/document-repository';

export class InMemoryDocumentRepository extends DocumentRepository {
  items: Document[] = [];

  async create(document: Document) {
    this.items.push(document);
    return document;
  }

  async findManyByUserId(userId: string): Promise<Document[]> {
    return this.items.filter((document) => document.userId === userId);
  }

  async findById({ id, userId }: { id: string; userId: string }) {
    const document = this.items.find(
      (document) => document.id.toString() === id && document.userId === userId,
    );

    if (!document) {
      return null;
    }

    return document;
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === id && item.userId === userId,
    );

    this.items.splice(itemIndex, 1);
  }

  async save(document: Document) {
    const itemIndex = this.items.findIndex(
      (item) =>
        item.id.toString() === document.id.toString() &&
        item.userId === document.userId,
    );

    this.items[itemIndex] = document;
  }

  async deleteManyByUserId(userId: string) {
    this.items = this.items.filter((document) => document.userId !== userId);
  }
}
