import { ListDocumentsUseCase } from '@/domain/document/use-cases/list-documents';
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user';
import { DocumentPresenter } from '@/infra/presenters/document-presenter';
import { Controller, Get } from '@nestjs/common';

@Controller('/documents')
export class ListDocumentsController {
  constructor(private readonly listDocumentsUseCase: ListDocumentsUseCase) {}

  @Get()
  async handle(@LoggedUser() user: UserPayload) {
    const response = await this.listDocumentsUseCase.handle({
      userId: user.id,
    });

    return response.value.map(DocumentPresenter.toHTTP);
  }
}
