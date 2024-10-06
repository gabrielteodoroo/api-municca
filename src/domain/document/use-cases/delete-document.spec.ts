import User from '@/domain/user/entities/user';
import { InMemoryDocumentRepository } from '../../../../test/repositories/in-memory-document-repository';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { DeleteDocumentUseCase } from './delete-document';
import Email from '@/domain/shared/email';
import Document from '../entities/document';

let userRepository: InMemoryUserRepository;
let documentRepository: InMemoryDocumentRepository;
let useCase: DeleteDocumentUseCase;

describe('Delete document', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    documentRepository = new InMemoryDocumentRepository();
    useCase = new DeleteDocumentUseCase(documentRepository, userRepository);
  });

  test('Should delete a document', async () => {
    const user = User.create({
      email: Email.create('gabriel@email.com'),
      name: 'Gabriel Teodoro',
    });

    userRepository.items.push(user);

    const document = Document.create({
      name: 'Document 1',
      status: 'active',
      userId: user.id.toString(),
    });

    documentRepository.items.push(document);

    const response = await useCase.handle({
      id: document.id.toString(),
      userId: user.id.toString(),
    });

    expect(response.isRight()).toBe(true);
  });
});
