import { PaginationParams } from "src/core/repositories/pagination-params.js";
import { AnswerCommentsRepository } from "src/domain/forum/application/repositories/answer-comments-repository.js";
import { AnswerComment } from "src/domain/forum/enterprise/entities/answer-comment.js";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = [];

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
