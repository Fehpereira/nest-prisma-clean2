import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user-decorator.js';
import type { UserPayload } from '../../auth/jwt-strategy.js';
import z from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe.js';
import { UpdateAnswerUseCase } from '../../../domain/forum/application/use-cases/update-answer.js';

const updateAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.uuid()).default([]),
});

const bodyValidationPipe = new ZodValidationPipe(updateAnswerBodySchema);

type UpdateAnswerBodySchema = z.infer<typeof updateAnswerBodySchema>;

@Controller('/answers/:id')
export class UpdateAnswerController {
  constructor(private updateAnswer: UpdateAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { content, attachments } = body;
    const { sub: userId } = user;

    const result = await this.updateAnswer.execute({
      content,
      authorId: userId,
      answerId,
      attachmentsIds: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
