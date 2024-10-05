import User from '@/domain/user/entities/user';
import { UserRepository } from '@/domain/user/repositories/user-repository';

export class InMemoryUserRepository extends UserRepository {
  items: User[] = [];

  async create(user: User) {
    this.items.push(user);
    return user;
  }

  async findById(id: string) {
    const user = this.items.find((user) => user.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);

    this.items[itemIndex] = user;
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    this.items.splice(itemIndex, 1);
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email.value === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findMany() {
    return this.items;
  }
}
