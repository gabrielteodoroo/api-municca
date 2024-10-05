import Email from '@/domain/shared/email';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import User from '../entities/user';
import { CreateUserUseCase } from './create-user';

let userRepository: InMemoryUserRepository;
let useCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(userRepository);
  });

  test('Should create a user', async () => {
    const user = await useCase.handle({
      name: 'Gabriel Teodoro',
      email: 'gabriel@email.com',
    });

    expect(user.isRight()).toBe(true);
    expect(userRepository.items[0].name).toBe('Gabriel Teodoro');
    expect(userRepository.items[0].email.value).toBe('gabriel@email.com');
  });

  test('Should not create a user with an invalid email', async () => {
    const user = await useCase.handle({
      name: 'Gabriel Teodoro',
      email: 'gabriel@',
    });

    expect(user.isLeft()).toBe(true);
  });

  test('Should not create a user with an email that already exists', async () => {
    const user = User.create({
      name: 'Gabriel Teodoro',
      email: Email.create('gabriel@email.com'),
    });

    userRepository.items.push(user);

    const response = await useCase.handle({
      name: 'Gabriel Teodoro',
      email: 'gabriel@email.com',
    });

    expect(response.isLeft()).toBe(true);
  });
});
