import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user-decorator.js';
import type { UserPayload } from '../../auth/jwt-strategy.js';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe.js';
import { AnswerQuestionUseCase } from '../../../domain/forum/application/use-cases/answer-question.js';

const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema);

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>;

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: AnswerQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content, attachments } = body;
    const { sub: userId } = user;

    const result = await this.answerQuestion.execute({
      authorId: userId,
      content,
      attachmentsIds: attachments,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
