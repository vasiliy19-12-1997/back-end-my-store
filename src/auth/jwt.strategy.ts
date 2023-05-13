import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma.service';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly ConfigService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: ConfigService.get('JWT_SECRET'),
    });
  }
  async validate({ id }: Pick<User, 'id'>) {
    return this.prisma.user.findUnique({ where: { id: +id } });
  }
}
