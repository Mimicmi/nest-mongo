import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async login(@Body() LoginUserDto, @Res() res) {
    const result = await this.authService.validateUserByPassword(LoginUserDto);
    if (result.success) {
      return res.json(result.data);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({ msg: result.msg });
    }
  }
}
