import User from '@/domain/user/entities/user';
import { InMemoryDocumentRepository } from '../../../../test/repositories/in-memory-document-repository';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { CreateDocumentUseCase } from './create-document';
import Email from '@/domain/shared/email';
import Identity from '@/core/entities/identity';

let userRepository: InMemoryUserRepository;
let documentRepository: InMemoryDocumentRepository;
let useCase: CreateDocumentUseCase;

describe('Create document', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    documentRepository = new InMemoryDocumentRepository();
    useCase = new CreateDocumentUseCase(documentRepository, userRepository);

    const user = User.create(
      {
        email: Email.create('gabriel@email.com'),
        name: 'Gabriel Teodoro',
      },
      new Identity('1'),
    );

    userRepository.items.push(user);
  });

  test('Should create a document', async () => {
    const response = await useCase.handle({
      name: 'Document 1',
      userId: '1',
      status: 'active',
    });

    expect(response.isRight()).toBe(true);
    expect(documentRepository.items[0].name).toBe('Document 1');
    expect(documentRepository.items[0].status).toBe('active');
    expect(documentRepository.items[0].user.id.toString()).toBe('1');
  });

  test('Should not create a document with an invalid user id', async () => {
    const response = await useCase.handle({
      name: 'Document 1',
      userId: '2',
      status: 'active',
    });

    expect(response.isLeft()).toBe(true);
  });
});
