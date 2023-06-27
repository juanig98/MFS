import { Body, Controller, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDto } from 'src/models/dtos/TokenDto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/User.decorator';
import { User as UserEntity} from 'src/models/entities/User.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post()
    async getToken(@Body() tokenDto: TokenDto): Promise<{ token: string }> {
      const { token } = tokenDto;
      if (!token) throw new NotFoundException();
      return await this.service.validar(token);
    }
  
    @Post('validate')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOkResponse()
    async validate(@User() usuario: UserEntity) {
      return usuario.toValidate();
    }
}
