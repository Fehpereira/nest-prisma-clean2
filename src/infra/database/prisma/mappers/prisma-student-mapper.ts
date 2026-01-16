import { Prisma } from '@/generated/prisma/browser.js';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js';
import { Student } from '../../../../domain/forum/enterprise/entities/student.js';
import { User as PrismaUser } from '../../../../generated/prisma/client.js';

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student {
    return Student.create(
      {
        name: raw.name,
        password: raw.password,
        email: raw.email,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(raw: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email,
      password: raw.password,
    };
  }
}
