import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './auth.dto';
import { User } from '@prisma/client';
import { Hash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (oldUser) {
      throw new BadRequestException('User already exist');
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.name.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number('+7(###) ###-##-##'),
        password: Hash(''),
      },
    });
  }
}
function faker() {
  throw new Error('Function not implemented.');
}
