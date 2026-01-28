import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author.js';
import { PaginationParams } from 'src/core/repositories/pagination-params.js';
import { QuestionCommentsRepository } from 'src/domain/forum/application/repositories/question-comments-repository.js';
import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment.js';
import { InMemoryStudentsRepository } from './in-memory-students-repository.js';

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = [];

  constructor(private inMemoryStudentsRepository: InMemoryStudentsRepository) {}

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id,
    );

    if (!questionComment) return null;

    return questionComment;
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIdex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    );

    this.items.splice(itemIdex, 1);
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }
  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.inMemoryStudentsRepository.items.find((student) => {
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

    return questionComments;
  }
}
