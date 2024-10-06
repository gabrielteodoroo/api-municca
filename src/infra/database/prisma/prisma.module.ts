import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '@/domain/user/repositories/user-repository';
import { UserPrismaRepository } from './repositories/user-prisma-repository';
import { DocumentRepository } from '@/domain/document/repositories/document-repository';
import { DocumentPrismaRepository } from './repositories/document-prisma-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: UserPrismaRepository },
    { provide: DocumentRepository, useClass: DocumentPrismaRepository },
  ],
  exports: [PrismaService, UserRepository, DocumentRepository],
})
export class PrismaModule {}
