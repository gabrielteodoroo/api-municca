import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUserUseCase } from '@/domain/user/use-cases/auth-user';
import { LoginDTO } from '../dtos/login.dto';
import { LoginUserPresenter } from '@/infra/presenters/login-user-presenter';

@Controller('/login')
export class LoginController {
  constructor(private readonly authUser: AuthUserUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() body: LoginDTO) {
    const { email } = body;
    const response = await this.authUser.handle({
      email,
    });

    if (response.isLeft()) {
      throw new UnauthorizedException(response.value.message);
    }

    const { user, token } = response.value;

    return {
      token,
      user: LoginUserPresenter.toHTTP(user),
    };
  }
}
