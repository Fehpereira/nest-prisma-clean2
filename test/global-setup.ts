import dotenv from 'dotenv';
import { execSync } from 'child_process';

export default async function () {
  dotenv.config({ path: '.env.test' });

  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
  });
}
