import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '@/domain/user/repositories/user-repository';
import { UserPrismaRepository } from './repositories/user-prisma-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: UserPrismaRepository },
  ],
  exports: [PrismaService, UserRepository],
})
export class PrismaModule {}
