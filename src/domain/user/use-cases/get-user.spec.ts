import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import Email from '../../shared/email';
import User from '../entities/user';
import { GetUserUseCase } from './get-user';

let userRepository: InMemoryUserRepository;
let useCase: GetUserUseCase;

describe('Detail user', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new GetUserUseCase(userRepository);
  });

  test('should return a user by id', async () => {
    const user = User.create({
      name: 'Gabriel Teodoro',
      email: Email.create('gabriel@email.com'),
    });

    userRepository.items.push(user);

    const response = await useCase.handle({
      id: user.id.toString(),
    });

    expect(userRepository.items[0]).toEqual(response.value);
    expect(response.isRight()).toBe(true);
  });

  test('should return null if invalid id is provided', async () => {
    const response = await useCase.handle({
      id: '1',
    });

    expect(response.isLeft()).toBe(true);
  });
});
