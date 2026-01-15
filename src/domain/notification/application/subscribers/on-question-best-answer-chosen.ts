import { EventHandler } from "../../../../core/events/event-handler.js";
import { AnswersRepository } from "../../../../domain/forum/application/repositories/answers-repository.js";
import { SendNotificationUseCase } from "../use-cases/send-notification.js";
import { DomainEvents } from "../../../../core/events/domain-events.js";
import { QuestionBestQuestionChosenEvent } from "../../../../domain/forum/enterprise/events/question-best-answer-chosen-event.js";

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestQuestionChosenEvent.name,
    );
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestQuestionChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    );

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title.substring(0, 20).concat('...')}" foi escolhida pelo autor!`,
      });
    }
  }
}
