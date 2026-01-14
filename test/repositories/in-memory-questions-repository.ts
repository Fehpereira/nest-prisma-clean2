import { DomainEvents } from "src/core/events/domain-events.js";
import { PaginationParams } from "src/core/repositories/pagination-params.js";
import { QuestionAttachmentsRepository } from "src/domain/forum/application/repositories/question-attachments-repository.js";
import { QuestionsRepository } from "src/domain/forum/application/repositories/questions-repository.js";
import { Question } from "src/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async delete(question: Question): Promise<void> {
    const itemIdex = this.items.findIndex((item) => item.id === question.id);

    this.items.splice(itemIdex, 1);

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    );
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) return null;

    return question;
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) return null;

    return question;
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async save(question: Question): Promise<void> {
    const itemIdex = this.items.findIndex((item) => item.id === question.id);

    this.items[itemIdex] = question;

    DomainEvents.dispatchEventsForAggreate(question.id);
  }

  async create(question: Question) {
    this.items.push(question);

    DomainEvents.dispatchEventsForAggreate(question.id);
  }
}
