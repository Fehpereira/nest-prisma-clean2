import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-question-comment-mapper.js';
import { PrismaService } from '@/infra/database/prisma/prisma.service.js';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import {
  QuestionComment,
  QuestionCommentProps,
} from 'src/domain/forum/enterprise/entities/question-comment.js';

export function makeQuestionComment(
  override?: Partial<QuestionCommentProps>,
  id?: UniqueEntityId,
) {
  const question = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    data?: Partial<QuestionCommentProps>,
  ): Promise<QuestionComment> {
    const questionComment = makeQuestionComment(data);

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questionComment),
    });

    return questionComment;
  }
}
