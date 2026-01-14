import { DomainEvent } from 'src/core/events/domain-event.js';
import type { Question } from '../entities/question.js';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';

export class QuestionBestQuestionChosenEvent implements DomainEvent {
  public ocurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityId;

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id;
  }
}
