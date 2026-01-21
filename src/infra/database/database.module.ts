import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository.js';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository.js';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository.js';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository.js';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository.js';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository.js';
import { QuestionsRepository } from '../../domain/forum/application/repositories/questions-repository.js';
import { StudentsRepository } from '../../domain/forum/application/repositories/students-repository.js';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository.js';
import { AnswersRepository } from '../../domain/forum/application/repositories/answers-repository.js';
import { QuestionCommentsRepository } from '../../domain/forum/application/repositories/question-comments-repository.js';
import { AnswerCommentsRepository } from '../../domain/forum/application/repositories/answer-comments-repository.js';
import { QuestionAttachmentsRepository } from '../../domain/forum/application/repositories/question-attachments-repository.js';
import { AnswerAttachmentsRepository } from '../../domain/forum/application/repositories/answer-attachments-repository.js';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    { provide: AnswersRepository, useClass: PrismaAnswersRepository },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    StudentsRepository,
    QuestionsRepository,
    AnswersRepository,
  ],
})
export class DatabaseModule {}
