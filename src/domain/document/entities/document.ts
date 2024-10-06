import Entity from '@/core/entities/entity';
import Identity from '@/core/entities/identity';
import User from '@/domain/user/entities/user';

type DocumentType = {
  userId: string;
  name: string;
  status: string;
};

export default class Document extends Entity<DocumentType> {
  static create(data: DocumentType, id?: Identity) {
    return new Document({ ...data }, id);
  }

  get name() {
    return this.attributes.name;
  }

  get status() {
    return this.attributes.status;
  }

  get userId() {
    return this.attributes.userId;
  }

  set name(name: string) {
    this.attributes.name = name;
  }

  set status(status: string) {
    this.attributes.status = status;
  }
}
