import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import {
  QuestionComment,
  QuestionCommentProps,
} from 'src/domain/forum/enterprise/entities/question-comment.js';

export function makeQuestionComment(
  override?: Partial<QuestionCommentProps>,
  id?: UniqueEntityId,
) {
  const question = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}
