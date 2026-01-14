import { UpdateAnswerUseCase } from './update-answer.js';
import type { Answer } from '../../enterprise/entities/answer.js';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answers-attachments-repository.js';
import { makeAnswer } from 'test/factories/make-answer.js';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id.js';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment.js';

let inMemoryAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: UpdateAnswerUseCase;
let newAnswer: Answer;

describe('Update Answer', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAttachmentsRepository,
    );
    sut = new UpdateAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAttachmentsRepository,
    );
    newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('author-1'),
    );
  });

  it('should be able to update a answer', async () => {
    await inMemoryAnswersRepository.create(newAnswer);

    inMemoryAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    );

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Conteúdo teste',
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    });
    expect(
      inMemoryAnswersRepository.items[0]?.attachments.currentItems,
    ).toHaveLength(2);
    expect(
      inMemoryAnswersRepository.items[0]?.attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ]);
  });

  it('not should be able to update a answer from another user', async () => {
    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-2',
      content: 'Conteúdo teste',
      attachmentsIds: [],
    });

    expect(result.value).toBeInstanceOf(Error);
  });
});
