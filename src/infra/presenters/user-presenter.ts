import User from '@/domain/user/entities/user';

export class UserPresenter {
  static toHTTP(entity: User) {
    return {
      id: entity.id.toString(),
      name: entity.name,
      email: entity.email.value,
    };
  }
}
