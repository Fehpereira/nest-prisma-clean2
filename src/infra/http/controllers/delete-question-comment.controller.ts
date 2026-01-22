import { BadRequestException, Controller, Delete, Param } from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user-decorator.js';
import type { UserPayload } from '../../auth/jwt-strategy.js';
import { DeleteQuestionCommentUseCase } from '../../../domain/forum/application/use-cases/delete-question-comment.js';

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteQuestionCommentUseCase) {}

  @Delete()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionCommentId: string,
  ) {
    const { sub: userId } = user;

    try {
      const result = await this.deleteQuestionComment.execute({
        authorId: userId,
        questionCommentId,
      });

      if (result.isLeft()) {
        throw new BadRequestException();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
