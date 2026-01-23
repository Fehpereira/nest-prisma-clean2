import { UseCaseError } from '@/core/errors/use-case-error.js';

export class InvalidAttachmentType extends Error implements UseCaseError {
  constructor(type: string) {
    super(`Attachment file ${type} is not valid.`);
  }
}
