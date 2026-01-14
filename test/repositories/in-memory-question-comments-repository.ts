import { PaginationParams } from "src/core/repositories/pagination-params.js";
import { QuestionCommentsRepository } from "src/domain/forum/application/repositories/question-comments-repository.js";
import { QuestionComment } from "src/domain/forum/enterprise/entities/question-comment.js";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = [];

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
}
