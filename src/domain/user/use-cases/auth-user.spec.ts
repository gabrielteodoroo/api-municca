import Email from '@/domain/shared/email';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { TokenSimulator } from '../../../../test/services/token';
import User from '../entities/user';
import { AuthUserUseCase } from './auth-user';

let userRespository: InMemoryUserRepository;
let tokenRepository: TokenSimulator;
let useCase: AuthUserUseCase;

describe('Auth User', () => {
  beforeEach(() => {
    userRespository = new InMemoryUserRepository();
    tokenRepository = new TokenSimulator();
    useCase = new AuthUserUseCase(userRespository, tokenRepository);
  });

  test('Should authenticate an user', async () => {
    const user = User.create({
      email: Email.create('gabriel@email.com'),
      name: 'Gabriel Teodoro',
    });

    userRespository.items.push(user);

    const response = await useCase.handle({
      email: 'gabriel@email.com',
      name: 'Gabriel Teodoro',
    });

    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual({
      token: expect.any(String),
      user: expect.any(User),
    });
  });
});
