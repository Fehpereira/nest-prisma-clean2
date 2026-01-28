import { DomainEvents } from 'src/core/events/domain-events.js';
import { PaginationParams } from 'src/core/repositories/pagination-params.js';
import { AnswerAttachmentsRepository } from 'src/domain/forum/application/repositories/answer-attachments-repository.js';
import { AnswersRepository } from 'src/domain/forum/application/repositories/answers-repository.js';
import { Answer } from 'src/domain/forum/enterprise/entities/answer.js';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) return null;

    return answer;
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async delete(answer: Answer): Promise<void> {
    const itemIdex = this.items.findIndex((item) => item.id !== answer.id);

    this.items.splice(itemIdex, 1);

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async save(answer: Answer): Promise<void> {
    const itemIdex = this.items.findIndex((item) => item.id === answer.id);

    this.items[itemIdex] = answer;

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getNewItems(),
    );
    await this.answerAttachmentsRepository.deleteMany(
      answer.attachments.getRemovedItems(),
    );

    DomainEvents.dispatchEventsForAggreate(answer.id);
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems(),
    );

    DomainEvents.dispatchEventsForAggreate(answer.id);
  }
}
