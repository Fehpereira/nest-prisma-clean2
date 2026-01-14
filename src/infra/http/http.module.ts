import { Module } from '@nestjs/common';
import { AuthenticateController } from './controllers/authenticate.controller.js';
import { CreateAccountController } from './controllers/create-account.controller.js';
import { CreateQuestionController } from './controllers/create-question.controller.js';
import { FetchRecentQuestionController } from './controllers/fetch-recent-questions.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
