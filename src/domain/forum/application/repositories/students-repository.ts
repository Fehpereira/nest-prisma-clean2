import { Injectable } from '@nestjs/common';
import type { Student } from '../../enterprise/entities/student.js';

@Injectable()
export abstract class StudentsRepository {
  abstract findByEmail(email: string): Promise<Student | null>;
  abstract create(student: Student): Promise<void>;
}
