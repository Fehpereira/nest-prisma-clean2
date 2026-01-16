import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer.js';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator.js';
import { hash, compare } from 'bcryptjs';

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash);
  }
  async hash(plain: string): Promise<string> {
    return await hash(plain, this.HASH_SALT_LENGTH);
  }
}
