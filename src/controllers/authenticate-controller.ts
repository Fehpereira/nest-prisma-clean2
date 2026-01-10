import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.email(),
//   password: z.string(),
// });

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(private readonly jwt: JwtService) {}

  // @HttpCode(201)
  // @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @Post()
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' });

    return token;
  }
}
