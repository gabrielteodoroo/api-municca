import Email from '@/domain/shared/email';
import { InMemoryDocumentRepository } from '../../../../test/repositories/in-memory-document-repository';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { EditDocumentUseCase } from './edit-document';
import User from '@/domain/user/entities/user';
import Identity from '@/core/entities/identity';
import Document from '../entities/document';

let userRepository: InMemoryUserRepository;
let documentRepository: InMemoryDocumentRepository;
let useCase: EditDocumentUseCase;

describe('Edit user document', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    documentRepository = new InMemoryDocumentRepository();
    useCase = new EditDocumentUseCase(documentRepository, userRepository);
  });

  test('Should edit a document', async () => {
    const user = User.create(
      {
        email: Email.create('gabriel@email.com'),
        name: 'Gabriel Teodoro',
      },
      new Identity('1'),
    );

    userRepository.items.push(user);

    const document = Document.create(
      {
        name: 'Document 1',
        status: 'active',
        userId: user.id.toString(),
      },
      new Identity('2'),
    );

    documentRepository.items.push(document);

    const response = await useCase.handle({
      id: document.id.toString(),
      name: 'Document 2',
      userId: user.id.toString(),
      status: 'inactive',
    });

    expect(response.isRight()).toBe(true);
    expect(documentRepository.items[0].name).toBe('Document 2');
    expect(documentRepository.items[0].status).toBe('inactive');
  });

  test('should returns null if invalid id is provided', async () => {
    const response = await useCase.handle({
      id: 'invalid-id',
      name: 'Document 2',
      userId: '1',
      status: 'inactive',
    });

    expect(response.isLeft()).toBe(true);
  });
});
