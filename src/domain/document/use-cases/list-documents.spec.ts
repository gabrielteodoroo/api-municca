import User from '@/domain/user/entities/user';
import { InMemoryDocumentRepository } from '../../../../test/repositories/in-memory-document-repository';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { ListDocumentsUseCase } from './list-documents';
import Email from '@/domain/shared/email';
import Identity from '@/core/entities/identity';
import Document from '../entities/document';

let userRepository: InMemoryUserRepository;
let documentRepository: InMemoryDocumentRepository;
let useCase: ListDocumentsUseCase;

describe('List documents', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    documentRepository = new InMemoryDocumentRepository();
    useCase = new ListDocumentsUseCase(documentRepository);
  });

  test('Should list documents', async () => {
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
      user,
      status: 'active',
    });

    documentRepository.items.push(document);

    const document2 = Document.create({
      name: 'Document 2',
      user,
      status: 'active',
    });

    documentRepository.items.push(document2);

    const response = await useCase.handle({ userId: user.id.toString() });

    expect(response.isRight()).toBe(true);
    expect(response.value).toHaveLength(2);
  });

  test('should return empty array if there are no documents', async () => {
    const response = await useCase.handle({ userId: '1' });

    expect(response.isRight()).toBe(true);
    expect(response.value).toHaveLength(0);
  });
});
