import { AnswerComment } from '../../../../domain/forum/enterprise/entities/answer-comment.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Comment as PrismaComment } from '../../../../generated/prisma/client.js';
import { Prisma } from '@/generated/prisma/browser.js';

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type.');
    }

    return AnswerComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        answerId: new UniqueEntityId(raw.answerId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(
    answerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt ?? null,
    };
  }
}
