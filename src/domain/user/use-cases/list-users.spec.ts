import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { ListUsersUseCase } from './list-users';
import User from '../entities/user';
import Email from '@/domain/shared/email';

let userRepository: InMemoryUserRepository;
let useCase: ListUsersUseCase;

describe('List users', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new ListUsersUseCase(userRepository);
  });

  test('Should list users', async () => {
    const user = User.create({
      name: 'Gabriel Teodoro',
      email: Email.create('gabriel@email.com'),
    });

    userRepository.items.push(user);

    const response = await useCase.handle();

    expect(response.isRight()).toBe(true);
    expect(response.value).toHaveLength(1);
  });

  test('should return empty array', async () => {
    const response = await useCase.handle();

    expect(response.isRight()).toBe(true);
    expect(response.value).toHaveLength(0);
  });
});
