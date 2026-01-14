import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import { Comment, type CommentProps } from './comment.js';
import { Optional } from 'src/core/types/optional.js';

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );

    return answerComment;
  }
}
