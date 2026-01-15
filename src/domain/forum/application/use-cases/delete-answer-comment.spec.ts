import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository.js';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment.js';
import { makeAnswerComment } from 'test/factories/make-answer-comment.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      answerCommentId: 'answer-1',
      authorId: 'author-1',
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('not should be able to delete a answer comment another user', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
