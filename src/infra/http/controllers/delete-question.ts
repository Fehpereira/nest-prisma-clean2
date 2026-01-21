import { BadRequestException, Controller, Delete, Param } from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user-decorator.js';
import type { UserPayload } from '../../auth/jwt-strategy.js';
import { DeleteQuestionUseCase } from '../../../domain/forum/application/use-cases/delete-question.js';

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private deleteQuestion: DeleteQuestionUseCase) {}

  @Delete()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { sub: userId } = user;

    const result = await this.deleteQuestion.execute({
      authorId: userId,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
