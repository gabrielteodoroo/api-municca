import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { GetUserUseCase } from '@/domain/user/use-cases/get-user';
import { UserPresenter } from '@/infra/presenters/user-presenter';
import { GetDocumentUseCase } from '@/domain/document/use-cases/get-document';
import { DocumentPresenter } from '@/infra/presenters/document-presenter';
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user';

@Controller('/documents/:id')
export class GetDocumentController {
  constructor(private readonly getDocumentUseCase: GetDocumentUseCase) {}

  @Get()
  async handle(@Param('id') id: string, @LoggedUser() user: UserPayload) {
    const response = await this.getDocumentUseCase.handle({
      id,
      userId: user.id,
    });

    if (response.isLeft()) {
      throw new NotFoundException(response.value.message);
    }

    return DocumentPresenter.toHTTP(response.value);
  }
}
