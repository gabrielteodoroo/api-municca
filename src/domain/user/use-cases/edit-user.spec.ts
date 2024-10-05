import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import Email from '../../shared/email';
import User from '../entities/user';
import { EditUserUseCase } from './edit-user';

let userRepository: InMemoryUserRepository;
let useCase: EditUserUseCase;

describe('Edit user', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new EditUserUseCase(userRepository);
  });

  test('should edit a user', async () => {
    const user = User.create({
      name: 'Gabriel Teodoro',
      email: Email.create('gabriel@email.com'),
    });

    userRepository.items.push(user);

    const editedUser = await useCase.handle({
      id: user.id.toString(),
      name: 'Gabriel',
      email: 'gabriel_teodoro@email.com',
    });

    expect(userRepository.items[0]).toEqual(editedUser.value);
    expect(editedUser.isRight()).toBe(true);
  });

  test('should returns null if invalid id is provided', async () => {
    const response = await useCase.handle({
      id: '1',
      name: 'Gabriel Teodoro',
      email: 'gabriel@email.com',
    });

    expect(response.isLeft()).toEqual(true);
  });

  test('Should return null if an invalid email is provided.', async () => {
    const user = User.create({
      name: 'Gabriel Teodoro',
      email: Email.create('gabriel@email.com'),
    });

    userRepository.items.push(user);

    const response = await useCase.handle({
      id: user.id.toString(),
      name: 'Gabriel Teodoro',
      email: 'gabriel@email',
    });

    expect(response.isLeft()).toEqual(true);
  });

  test('Should return null if an existing email is provided.', async () => {
    const gabriel = User.create({
      name: 'Gabriel Teodoro',
      email: Email.create('gabriel@email.com'),
    });

    userRepository.items.push(gabriel);

    const gabrielBarbosa = User.create({
      name: 'Gabriel Barbosa',
      email: Email.create('gabrielbarbosa@email.com'),
    });

    userRepository.items.push(gabrielBarbosa);

    const response = await useCase.handle({
      id: gabriel.id.toString(),
      name: 'Gabriel Teodoro',
      email: 'gabrielbarbosa@email.com',
    });

    expect(response.isLeft()).toEqual(true);
  });
});
