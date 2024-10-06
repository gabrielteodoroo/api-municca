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
import { EditUserDTO } from '../dtos/edit-user.dto';
import { EditUserUseCase } from '@/domain/user/use-cases/edit-user';
import { UserPresenter } from '@/infra/presenters/user-presenter';

@Controller('/users/:id')
export class EditUserController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(@Param('id') id: string, @Body() body: EditUserDTO) {
    const { email, name } = body;

    const response = await this.editUserUseCase.handle({
      id,
      email,
      name,
    });

    if (response.isLeft()) {
      if (response.value.constructor === NotFoundError) {
        throw new NotFoundException(response.value.message);
      }
      throw new BadRequestException(response.value.message);
    }

    return UserPresenter.toHTTP(response.value);
  }
}
