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
import { UpdateAnswerController } from './controllers/update-answer.controller.js';
import { UpdateAnswerUseCase } from '../../domain/forum/application/use-cases/update-answer.js';
import { DeleteAnswerController } from './controllers/delete-answer.controller.js';
import { DeleteAnswerUseCase } from '../../domain/forum/application/use-cases/delete-answer.js';
import { FetchQuestionAnswersUseCase } from '../../domain/forum/application/use-cases/fetch-question-answers.js';
import { ChooseQuestionBestAnswerUseCase } from '../../domain/forum/application/use-cases/choose-question-best-answer.js';
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller.js';
import { CommentOnQuestionController } from './controllers/comment-on-question.controller.js';
import { CommentOnQuestionUseCase } from '../../domain/forum/application/use-cases/comment-on-question.js';
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller.js';
import { DeleteQuestionCommentUseCase } from '../../domain/forum/application/use-cases/delete-question-comment.js';
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller.js';
import { CommentOnAnswerUseCase } from '../../domain/forum/application/use-cases/comment-on-answer.js';
import { DeleteAnswerCommentUseCase } from '../../domain/forum/application/use-cases/delete-answer-comment.js';
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller.js';
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller.js';
import { FetchQuestionCommentsUseCase } from '../../domain/forum/application/use-cases/fetch-question-comments.js';
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller.js';
import { FetchAnswersCommentsUseCase } from '../../domain/forum/application/use-cases/fetch-answer-comments.js';
import { UploadAttachmentController } from './controllers/upload-attachment.controller.js';
import { StorageModule } from '../storage/storage.module.js';
import { UploadAndCreateAttachmentUseCase } from '../../domain/forum/application/use-cases/upload-and-create-attachment.js';

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
    UpdateQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    UpdateAnswerController,
    DeleteAnswerController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
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
    UpdateAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswersCommentsUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}
