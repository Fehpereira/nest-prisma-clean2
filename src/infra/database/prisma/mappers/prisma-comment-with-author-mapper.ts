import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import {
  Comment as PrismaComment,
  User as PrismaUser,
} from '../../../../generated/prisma/client.js';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author.js';

type PrismaCommentWithAuthor = PrismaComment & {
  author: PrismaUser;
};

export class PrismaCommentWithAuthorMapper {
  static toDomain(raw: PrismaCommentWithAuthor): CommentWithAuthor {
    if (!raw.questionId) {
      throw new Error('Invalid comment type.');
    }
    return CommentWithAuthor.create({
      commentId: new UniqueEntityId(raw.id),
      authorId: new UniqueEntityId(raw.authorId),
      author: raw.author.name,
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
