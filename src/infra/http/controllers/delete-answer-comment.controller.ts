import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/current-user-decorator.js';
import type { UserPayload } from '../../auth/jwt-strategy.js';
import { DeleteAnswerCommentUseCase } from '../../../domain/forum/application/use-cases/delete-answer-comment.js';

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: DeleteAnswerCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerCommentId: string,
  ) {
    const { sub: userId } = user;

    const result = await this.deleteAnswerComment.execute({
      authorId: userId,
      answerCommentId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
