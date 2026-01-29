import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository.js';
import { DeleteQuestionCommentUseCase } from './delete-question-comment.js';
import { makeQuestionComment } from 'test/factories/make-question-comment.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository.js';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;
let inMemoryStudentsRepository: InMemoryStudentsRepository;

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();

    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    );
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({
      questionCommentId: 'question-1',
      authorId: 'author-1',
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it('not should be able to delete a question comment another user', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
