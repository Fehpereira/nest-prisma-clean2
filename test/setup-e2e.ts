import { execSync } from 'child_process';
import { randomUUID } from 'crypto';

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Database url error!');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schemaId);
  return url.toString();
}

const schemaId = randomUUID();

beforeAll(() => {
  const databaseURL = generateUniqueDatabaseURL(schemaId);

  process.env.DATABASE_URL = databaseURL;

  execSync('npx prisma generate', { stdio: 'inherit' });
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
});

afterAll(() => {
  execSync(`npx prisma db execute --stdin`, {
    input: `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`,
    stdio: 'inherit',
  });
});
