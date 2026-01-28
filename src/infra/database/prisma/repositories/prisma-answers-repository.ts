import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../../../../core/repositories/pagination-params.js';
import { AnswersRepository } from '../../../../domain/forum/application/repositories/answers-repository.js';
import { Answer } from '../../../../domain/forum/enterprise/entities/answer.js';
import { PrismaService } from '../prisma.service.js';
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper.js';
import { AnswerAttachmentsRepository } from '../../../../domain/forum/application/repositories/answer-attachments-repository.js';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    });

    if (!answer) {
      return null;
    }

    return PrismaAnswerMapper.toDomain(answer);
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const perPage = 20;

    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return answers.map(PrismaAnswerMapper.toDomain);
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.create({
      data,
    });

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems(),
    );
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await Promise.all([
      this.prisma.answer.update({
        where: {
          id: data.id,
        },
        data,
      }),
      this.answerAttachmentsRepository.createMany(
        answer.attachments.getNewItems(),
      ),
      this.answerAttachmentsRepository.deleteMany(
        answer.attachments.getRemovedItems(),
      ),
    ]);
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString(),
      },
    });
  }
}
