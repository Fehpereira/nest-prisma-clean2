import { PrismaQuestionMapper } from '@/infra/database/prisma/mappers/prisma-question-mapper.js';
import { PrismaService } from '@/infra/database/prisma/prisma.service.js';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import {
  Question,
  QuestionProps,
} from 'src/domain/forum/enterprise/entities/question.js';
import { Slug } from 'src/domain/forum/enterprise/entities/value-objects/slug.js';

export function makeQuestion(
  override?: Partial<QuestionProps>,
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
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

  async makePrismaQuestion(data?: Partial<QuestionProps>): Promise<Question> {
    const question = makeQuestion(data);

    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    });

    return question;
  }
}