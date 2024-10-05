import Entity from '@/core/entities/entity';
import Identity from '@/core/entities/identity';
import User from '@/domain/user/entities/user';

type DocumentType = {
  user: User;
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

  get user() {
    return this.attributes.user;
  }

  set name(name: string) {
    this.attributes.name = name;
  }

  set status(status: string) {
    this.attributes.status = status;
  }
}
