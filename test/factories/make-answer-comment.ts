import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import {
  AnswerComment,
  AnswerCommentProps,
} from 'src/domain/forum/enterprise/entities/answer-comment.js';

export function makeAnswerComment(
  override?: Partial<AnswerCommentProps>,
  id?: UniqueEntityId,
) {
  const answer = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return answer;
}
