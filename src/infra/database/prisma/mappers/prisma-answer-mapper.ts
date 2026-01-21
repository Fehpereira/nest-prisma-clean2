import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Answer } from '../../../../domain/forum/enterprise/entities/answer.js';
import { Answer as PrismaAnswer } from '../../../../generated/prisma/client.js';

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        questionId: new UniqueEntityId(raw.questionId),
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(raw: Answer): PrismaAnswer {
    return {
      id: raw.id.toString(),
      authorId: raw.authorId.toString(),
      questionId: raw.questionId.toString(),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? null,
    };
  }
}
