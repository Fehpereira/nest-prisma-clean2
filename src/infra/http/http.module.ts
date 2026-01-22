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
import { UpdateQuestionController } from './controllers/update-question-controller.js';
import { UpdateQuestionUseCase } from '../../domain/forum/application/use-cases/update-question.js';
import { DeleteQuestionController } from './controllers/delete-question.js';
import { DeleteQuestionUseCase } from '../../domain/forum/application/use-cases/delete-question.js';
import { AnswerQuestionController } from './controllers/answer-question.controller.js';
import { AnswerQuestionUseCase } from '../../domain/forum/application/use-cases/answer-question.js';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
    UpdateQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    UpdateQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
  ],
})
export class HttpModule {}
