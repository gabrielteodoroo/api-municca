import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error';
import { EditDocumentUseCase } from '@/domain/document/use-cases/edit-document';
import { EditDocumentDTO } from '../dtos/edit-document.dto';
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user';
import { DocumentPresenter } from '@/infra/presenters/document-presenter';

@Controller('/documents/:id')
export class EditDocumentController {
  constructor(private readonly editDocumentUseCase: EditDocumentUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @Body() body: EditDocumentDTO,
    @LoggedUser() user: UserPayload,
  ) {
    const { name, status } = body;

    const response = await this.editDocumentUseCase.handle({
      id,
      name,
      status,
      userId: user.id,
    });

    if (response.isLeft()) {
      if (response.value.constructor === NotFoundError) {
        throw new NotFoundException(response.value.message);
      }
      throw new BadRequestException(response.value.message);
    }

    return DocumentPresenter.toHTTP(response.value);
  }
}
