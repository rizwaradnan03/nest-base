import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.Strategy';
import { JwtStrategy } from './strategy/jwt.Strategy';

@Module({
  imports: [JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: {expiresIn: process.env.EXPIRED_TOKEN}
  }),PassportModule,PassportModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalAuthGuard, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
