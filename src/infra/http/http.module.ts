import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [UserModule, DocumentModule],
  exports: [UserModule, DocumentModule],
})
export class HttpModule {}
