import { InMemoryDocumentRepository } from '../../../../test/repositories/in-memory-document-repository';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { GetDocumentUseCase } from './get-document';
import User from '@/domain/user/entities/user';
import Email from '@/domain/shared/email';
import Identity from '@/core/entities/identity';
import Document from '../entities/document';

let userRepository: InMemoryUserRepository;
let documentRepository: InMemoryDocumentRepository;
let useCase: GetDocumentUseCase;

describe('Get document', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    documentRepository = new InMemoryDocumentRepository();
    useCase = new GetDocumentUseCase(documentRepository);
  });

  test('Should return a document by id', async () => {
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
        user,
        status: 'active',
      },
      new Identity('2'),
    );

    documentRepository.items.push(document);

    const response = await useCase.handle({
      id: document.id.toString(),
      userId: user.id.toString(),
    });

    expect(response.isRight()).toBe(true);
    expect(response.value.name).toBe('Document 1');
  });
});
