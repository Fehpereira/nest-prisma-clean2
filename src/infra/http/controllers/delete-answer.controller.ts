import { BadRequestException, Controller, Delete, Param } from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user-decorator.js';
import type { UserPayload } from '../../auth/jwt-strategy.js';
import { DeleteAnswerUseCase } from '../../../domain/forum/application/use-cases/delete-answer.js';

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) {}

  @Delete()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { sub: userId } = user;

    try {
      const result = await this.deleteAnswer.execute({
        authorId: userId,
        answerId,
      });

      if (result.isLeft()) {
        throw new BadRequestException();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
