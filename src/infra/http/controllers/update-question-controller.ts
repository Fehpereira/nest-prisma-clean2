import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user-decorator.js';
import type { UserPayload } from '../../auth/jwt-strategy.js';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe.js';
import { UpdateQuestionUseCase } from '@/domain/forum/application/use-cases/update-question.js';

const updateQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(updateQuestionBodySchema);

type UpdateQuestionBodySchema = z.infer<typeof updateQuestionBodySchema>;

@Controller('/questions/:id')
export class UpdateQuestionController {
  constructor(private updateQuestion: UpdateQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { title, content } = body;
    const { sub: userId } = user;

    const result = await this.updateQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
      questionId,
    });

    console.log('ESSE É O RESULTADO:', result);

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
