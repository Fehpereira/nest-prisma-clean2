import { Module } from '@nestjs/common';
import { AuthenticateController } from './controllers/authenticate.controller.js';
import { CreateAccountController } from './controllers/create-account.controller.js';
import { CreateQuestionController } from './controllers/create-question.controller.js';
import { FetchRecentQuestionController } from './controllers/fetch-recent-questions.controller.js';
import { DatabaseModule } from '../database/database.module.js';
import { CreateQuestionUseCase } from '../../domain/forum/application/use-cases/create-question.js';
import { FetchRecentQuestionsUseCase } from '../../domain/forum/application/use-cases/fetch-recent-questions.js';
import { AuthenticateStudentUseCase } from '../../domain/forum/application/use-cases/authenticate-student.js';
import { RegisterStudentUseCase } from '../../domain/forum/application/use-cases/register-student.js';
import { CryptographyModule } from '../cryptography/cryptography.module.js';
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.js';
import { GetQuestionBySlugUseCase } from '../../domain/forum/application/use-cases/get-question-by-slug.js';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
