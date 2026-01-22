import { Answer } from '@/domain/forum/enterprise/entities/answer.js';

export class AnswerPresenter {
  static toHTTP(answer: Answer) {
    return {
      id: answer.id.toString(),
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  }
}
