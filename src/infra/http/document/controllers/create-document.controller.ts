import { CreateUserUseCase } from '@/domain/user/use-cases/create-user';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { CreateDocumentDTO } from '../dtos/create-document.dto';
import { CreateDocumentUseCase } from '@/domain/document/use-cases/create-document';
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user';
import { DocumentPresenter } from '@/infra/presenters/document-presenter';

@Controller('/documents')
export class CreateDocumentController {
  constructor(private readonly createDocumentUseCase: CreateDocumentUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body() body: CreateDocumentDTO,
    @LoggedUser() user: UserPayload,
  ) {
    const { name, status } = body;

    const response = await this.createDocumentUseCase.handle({
      name,
      status,
      userId: user.id,
    });

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message);
    }

    return DocumentPresenter.toHTTP(response.value);
  }
}
