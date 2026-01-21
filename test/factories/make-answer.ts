import { PrismaAnswerMapper } from '@/infra/database/prisma/mappers/prisma-answer-mapper.js';
import { PrismaService } from '@/infra/database/prisma/prisma.service.js';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import {
  Answer,
  AnswerProps,
} from 'src/domain/forum/enterprise/entities/answer.js';

export function makeAnswer(
  override?: Partial<AnswerProps>,
  id?: UniqueEntityId,
) {
  const question = Answer.create(
    {
      questionId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
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

  async makePrismaQuestion(data?: Partial<AnswerProps>): Promise<Answer> {
    const answer = makeAnswer(data);

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    });

    return answer;
  }
}
