import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from 'src/domain/forum/enterprise/entities/answer-attachment.js';

export function makeAnswerAttachment(
  override?: Partial<AnswerAttachmentProps>,
  id?: UniqueEntityId,
) {
  const answer = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return answer;
}
