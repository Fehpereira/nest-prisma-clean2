import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module.js';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { response } from 'express';
import { PrismaService } from '../../database/prisma/prisma.service.js';

describe('Create account (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await prisma.question.deleteMany();
    await prisma.user.deleteMany();

    await app.init();
  });

  test('[POST] /accounts', async () => {
    await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(200);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
