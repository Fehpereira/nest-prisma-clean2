import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConflictException } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const hashedPassword = await hash(password, 8);

    if (userWithSameEmail) {
      throw new ConflictException(
        'User whit same e-mail address already exists.',
      );
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
