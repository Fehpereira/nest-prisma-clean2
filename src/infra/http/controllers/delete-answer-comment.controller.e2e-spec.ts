import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module.js';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { StudentFactory } from 'test/factories/make-student.js';
import { DatabaseModule } from '@faker-js/faker';
import { PrismaService } from '@/infra/database/prisma/prisma.service.js';
import { QuestionFactory } from 'test/factories/make-question.js';
import { QuestionCommentFactory } from 'test/factories/make-question-comment.js';
import { AnswerFactory } from 'test/factories/make-answer.js';
import { AnswerCommentFactory } from 'test/factories/make-answer-comment.js';

describe('Delete answer comment (E2E)', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let answerFactory: AnswerFactory;
  let answerCommentFactory: AnswerCommentFactory;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerFactory,
        AnswerCommentFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    answerFactory = moduleRef.get(AnswerFactory);
    answerCommentFactory = moduleRef.get(AnswerCommentFactory);

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[DELETE] /questions/comments/:id', async () => {
    const user = await studentFactory.makePrismaStudent();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
    });

    const answerComment = await answerCommentFactory.makePrismaAnswerComment({
      answerId: answer.id,
      authorId: user.id,
    });

    const response = await request(app.getHttpServer())
      .delete(`/answers/comments/${answerComment.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(204);

    const commentOnDatabase = await prisma.comment.findUnique({
      where: {
        id: answerComment.id.toString(),
      },
    });

    expect(commentOnDatabase).toBeNull();
  });
});
