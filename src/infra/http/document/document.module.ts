import { DocumentRepository } from '@/domain/document/repositories/document-repository';
import { CreateDocumentUseCase } from '@/domain/document/use-cases/create-document';
import { UserRepository } from '@/domain/user/repositories/user-repository';
import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateDocumentController } from './controllers/create-document.controller';
import { CryptoModule } from '@/infra/crypto/crypto.module';
import { ListDocumentsUseCase } from '@/domain/document/use-cases/list-documents';
import { ListDocumentsController } from './controllers/list-documents.controller';
import { GetDocumentUseCase } from '@/domain/document/use-cases/get-document';
import { GetDocumentController } from './controllers/get-document.controller';
import { EditDocumentUseCase } from '@/domain/document/use-cases/edit-document';
import { EditDocumentController } from './controllers/edit-document.controller';
import { DeleteDocumentController } from './controllers/delete-document.controller';
import { DeleteDocumentUseCase } from '@/domain/document/use-cases/delete-document';

@Module({
  imports: [DatabaseModule, CryptoModule],
  providers: [
    {
      provide: CreateDocumentUseCase,
      useFactory: (
        documentRepository: DocumentRepository,
        userRepository: UserRepository,
      ) => {
        return new CreateDocumentUseCase(documentRepository, userRepository);
      },
      inject: [DocumentRepository, UserRepository],
    },
    {
      provide: ListDocumentsUseCase,
      useFactory: (documentRepository: DocumentRepository) => {
        return new ListDocumentsUseCase(documentRepository);
      },
      inject: [DocumentRepository],
    },
    {
      provide: GetDocumentUseCase,
      useFactory: (documentRepository: DocumentRepository) => {
        return new GetDocumentUseCase(documentRepository);
      },
      inject: [DocumentRepository],
    },
    {
      provide: EditDocumentUseCase,
      useFactory: (
        documentRepository: DocumentRepository,
        userRepository: UserRepository,
      ) => {
        return new EditDocumentUseCase(documentRepository, userRepository);
      },
      inject: [DocumentRepository, UserRepository],
    },
    {
      provide: DeleteDocumentUseCase,
      useFactory: (
        documentRepository: DocumentRepository,
        userRepository: UserRepository,
      ) => {
        return new DeleteDocumentUseCase(documentRepository, userRepository);
      },
      inject: [DocumentRepository, UserRepository],
    },
  ],
  controllers: [
    CreateDocumentController,
    ListDocumentsController,
    GetDocumentController,
    EditDocumentController,
    DeleteDocumentController,
  ],
})
export class DocumentModule {}
