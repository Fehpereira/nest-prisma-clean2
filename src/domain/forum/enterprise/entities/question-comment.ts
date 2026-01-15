import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Comment, type CommentProps } from './comment.js';
import { Optional } from '../../../../core/types/optional.js';

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );

    return questionComment;
  }
}
