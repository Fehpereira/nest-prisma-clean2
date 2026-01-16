import { DomainEvents } from '@/core/events/domain-events.js';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository.js';
import { Student } from '@/domain/forum/enterprise/entities/student.js';

export class InMemoryStudentsRepository implements StudentsRepository {
  items: Student[] = [];

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find((s) => s.email === email);

    if (!student) {
      return null;
    }

    return student;
  }

  async create(student: Student): Promise<void> {
    this.items.push(student);

    DomainEvents.dispatchEventsForAggreate(student.id);
  }
}
