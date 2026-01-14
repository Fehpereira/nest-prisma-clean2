import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from 'src/domain/forum/enterprise/entities/question-attachment.js';

export function makeQuestionAttachment(
  override?: Partial<QuestionAttachmentProps>,
  id?: UniqueEntityId,
) {
  const question = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return question;
}
