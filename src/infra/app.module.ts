import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env.js';
import { AuthModule } from './auth/auth.module.js';
import { HttpModule } from './http/http.module.js';
import { DatabaseModule } from './database/database.module.js';
import { EnvService } from './env/env.service.js';
import { EnvModule } from './env/env.module.js';
import { EventsModule } from './events/events.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    DatabaseModule,
    EnvModule,
    EventsModule,
  ],
  providers: [EnvService],
})
export class AppModule {}
