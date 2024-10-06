import Document from '@/domain/document/entities/document';
import { DocumentRepository } from '@/domain/document/repositories/document-repository';
import { PrismaService } from '../prisma.service';
import { DocumentPrismaMapper } from '../mappers/document-prisma-mapper';

export class DocumentPrismaRepository implements DocumentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(document: Document): Promise<Document> {
    const data = DocumentPrismaMapper.toPersistence(document);

    const newDocument = await this.prismaService.document.create({ data });

    return DocumentPrismaMapper.toDomain(newDocument);
  }

  async findManyByUserId(userId: string): Promise<Document[]> {
    const documents = await this.prismaService.document.findMany({
      where: { userId },
    });

    return documents.map(DocumentPrismaMapper.toDomain);
  }

  async findById({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<Document | null> {
    const document = await this.prismaService.document.findFirst({
      where: { id, userId },
    });

    if (!document) {
      return null;
    }

    return DocumentPrismaMapper.toDomain(document);
  }

  async save(document: Document): Promise<void> {
    const data = DocumentPrismaMapper.toPersistence(document);

    await this.prismaService.document.update({
      where: { id: document.id.toString() },
      data,
    });
  }

  async delete({ id, userId }: { id: string; userId: string }): Promise<void> {
    await this.prismaService.document.delete({
      where: { id, userId },
    });
  }
}
