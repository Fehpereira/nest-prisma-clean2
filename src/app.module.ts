import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import { CreateAccountController } from './controllers/create-account.controller.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
