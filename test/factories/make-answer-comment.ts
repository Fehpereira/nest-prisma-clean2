import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prisma-answer-comment-mapper.js';
import { PrismaService } from '@/infra/database/prisma/prisma.service.js';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import {
  AnswerComment,
  AnswerCommentProps,
} from 'src/domain/forum/enterprise/entities/answer-comment.js';

export function makeAnswerComment(
  override?: Partial<AnswerCommentProps>,
  id?: UniqueEntityId,
) {
  const answer = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return answer;
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    data?: Partial<AnswerCommentProps>,
  ): Promise<AnswerComment> {
    const answerComment = makeAnswerComment(data);

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answerComment),
    });

    return answerComment;
  }
}
