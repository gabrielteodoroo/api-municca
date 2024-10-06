import Document from '@/domain/document/entities/document';

export class DocumentPresenter {
  static toHTTP(entity: Document) {
    return {
      id: entity.id.toString(),
      name: entity.name,
      status: entity.status,
      userId: entity.userId,
    };
  }
}
