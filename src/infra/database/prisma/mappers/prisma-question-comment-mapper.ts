import { QuestionComment } from '../../../../domain/forum/enterprise/entities/question-comment.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Comment as PrismaComment } from '../../../../generated/prisma/client.js';
import { Prisma } from '@/generated/prisma/browser.js';

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.questionId) {
      throw new Error('Invalid comment type.');
    }

    return QuestionComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        questionId: new UniqueEntityId(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(
    questionComment: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
      questionId: questionComment.questionId.toString(),
      content: questionComment.content,
      createdAt: questionComment.createdAt,
      updatedAt: questionComment.updatedAt ?? null,
    };
  }
}
