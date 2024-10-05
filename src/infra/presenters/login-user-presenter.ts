import User from '@/domain/user/entities/user';

export class LoginUserPresenter {
  static toHTTP(entitity: User) {
    return {
      id: entitity.id.toString(),
      name: entitity.name,
      email: entitity.email.value,
    };
  }
}
