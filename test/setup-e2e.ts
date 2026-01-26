import { config } from 'dotenv';

import { PrismaClient } from '@/generated/prisma/client.js';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Database url error!');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId);

  process.env.DATABASE_URL = databaseURL;

  execSync('npx prisma generate');
  execSync('npx prisma migrate deploy');
});

afterAll(async () => {
  const prisma = new PrismaClient({ accelerateUrl: '' });

  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
});
