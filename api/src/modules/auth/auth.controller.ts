import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDto } from 'src/modules/auth/dtos/TokenDto';
import { User } from 'src/common/decorators/User.decorator';
import { User as UserEntity } from 'src/models/entities/User.entity';
import { LoginDto } from 'src/modules/auth/dtos/LoginDto';
import { AuthUserGuard } from 'src/common/guards/User/AuthUser.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  
  constructor(private service: AuthService) { }

  @Post()
  async getToken(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const validate = await this.service.validate(loginDto);

    if (!validate.valid) throw new UnauthorizedException(validate.result);

    return await this.service.generateToken(validate.user)
  }

  @Post('validate')
  @ApiBearerAuth()
  @UseGuards(AuthUserGuard)
  @ApiOkResponse()
  async validate(@User() usuario: UserEntity) {
    console.log("LLEGO!");
    
    return usuario.toValidate();
  }
}
