import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user';
import { DeleteUserUseCase } from '@/domain/user/use-cases/delete-user';
import { DeleteDocumentUseCase } from '@/domain/document/use-cases/delete-document';

@Controller('/documents/:id')
export class DeleteDocumentController {
  constructor(private readonly deleteDocumentUseCase: DeleteDocumentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string, @LoggedUser() user: UserPayload) {
    const response = await this.deleteDocumentUseCase.handle({
      id,
      userId: user.id,
    });

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message);
    }
  }
}
