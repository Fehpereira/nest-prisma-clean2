import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author.js';
import { PaginationParams } from 'src/core/repositories/pagination-params.js';
import { AnswerCommentsRepository } from 'src/domain/forum/application/repositories/answer-comments-repository.js';
import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment.js';
import { InMemoryStudentsRepository } from './in-memory-students-repository.js';

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = [];

  constructor(private studentRepository: InMemoryStudentsRepository) {}

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (!answerComment) return null;

    return answerComment;
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIdex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    );

    this.items.splice(itemIdex, 1);
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answerComment = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentRepository.items.find((student) => {
          return student.id.equals(comment.authorId);
        });

        if (!author) {
          throw new Error(
            `Author with ID "${comment.authorId.toString()}" does not exists.`,
          );
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          author: author.name,
        });
      });

    return answerComment;
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }
}
