import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async  validateUserByPassword(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    console.log('user', user);
    return new Promise((resolve) => {
      if (!user) {
        resolve({ success: false, msg: 'User not found' })
      }
      user.validatePassword(loginUserDto.password, (err, isMatch) => {
        if (isMatch) {
          resolve({ success: true, data: this.createJawtPayload(user) })
        } else {
          resolve({ success: false, msg: 'Wrong user or password' })
        }
      });
    });
  }

  createJawtPayload(user: UserDocument) {
    const payload: JwtPayload = {
      sub: user._id,
      email: user.email
    }
    const jwt = this.jwtService.sign(payload);
    return {
      expt: 3600,
      token: jwt
    }
  }
}
