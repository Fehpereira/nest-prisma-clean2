import { Module } from '@nestjs/common';
import { BcryptHasher } from './bcrypt-hasher.js';
import { JwtEncrypter } from './jwt-encrypter.js';
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter.js';
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer.js';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator.js';

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
