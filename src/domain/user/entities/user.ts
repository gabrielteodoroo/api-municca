import Entity from '@/core/entities/entity';
import Identity from '@/core/entities/identity';
import Email from '@/domain/shared/email';

type UserType = {
  name: string;
  email: Email;
};

export default class User extends Entity<UserType> {
  static create(data: UserType, id?: Identity) {
    return new User({ ...data }, id);
  }

  get name() {
    return this.attributes.name;
  }

  get email() {
    return this.attributes.email;
  }

  set name(name: string) {
    this.attributes.name = name;
  }

  set email(email: Email) {
    this.attributes.email = email;
  }
}
