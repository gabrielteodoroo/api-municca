import { InMemoryDocumentRepository } from '../../../../test/repositories/in-memory-document-repository';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import Identity from '../../../core/entities/identity';
import Email from '../../shared/email';
import User from '../entities/user';
import { DeleteUserUseCase } from './delete-user';
import Document from '@/domain/document/entities/document';

let userRepository: InMemoryUserRepository;
let documentRepository: InMemoryDocumentRepository;
let useCase: DeleteUserUseCase;

describe('Delete user', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    documentRepository = new InMemoryDocumentRepository();
    useCase = new DeleteUserUseCase(userRepository, documentRepository);

    const user = User.create(
      {
        name: 'Gabriel Teodoro',
        email: Email.create('gabriel@email.com'),
      },
      new Identity('1'),
    );

    userRepository.items.push(user);

    const document = Document.create({
      name: 'Document 1',
      status: 'active',
      userId: '1',
    });

    documentRepository.items.push(document);
  });

  test('should delete a user', async () => {
    expect(userRepository.items).toHaveLength(1);
    const response = await useCase.handle({ id: '1' });

    expect(response.isRight()).toBe(true);
    expect(userRepository.items).toHaveLength(0);
  });

  test('should returns null if invalid id is provided', async () => {
    const response = await useCase.handle({ id: '2' });

    expect(response.isLeft()).toBe(true);
  });
});
