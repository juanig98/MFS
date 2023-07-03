import { Body, Controller, HttpCode, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/common/decorators/User.decorator';
import { User as UserEntity } from 'src/models/entities/User.entity';
import { LoginDto } from 'src/modules/auth/dtos/LoginDto';
import { AuthUserGuard } from 'src/common/guards/User/AuthUser.guard';
import { ReturnLoginDto } from './dtos/ReturnLoginDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private service: AuthService) { }

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    const validate = await this.service.validate(loginDto);

    if (!validate.valid) throw new UnauthorizedException(validate.result);

    const token = await this.service.generateToken(validate.user);

    return { authenticated: true, token }
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @Post('validate')
  @UseGuards(AuthUserGuard)
  @HttpCode(200)
  async validate(@User() usuario: UserEntity) {
    return usuario.toValidate();
  }
}
