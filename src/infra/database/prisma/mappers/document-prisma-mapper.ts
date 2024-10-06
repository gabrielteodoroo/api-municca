import Identity from '@/core/entities/identity';
import Document from '@/domain/document/entities/document';
import { Document as DocumentDatabase } from '@prisma/client';

export class DocumentPrismaMapper {
  static toDomain(entity: DocumentDatabase): Document {
    return Document.create(
      {
        name: entity.name,
        status: entity.status,
        userId: entity.userId,
      },
      new Identity(entity.id),
    );
  }
  static toPersistence(entity: Document): DocumentDatabase {
    return {
      id: entity.id.toString(),
      name: entity.name,
      status: entity.status,
      userId: entity.userId,
    };
  }
}
