import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { DatabaseModule } from '@/infra/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

describe('ListUsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  let user: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = moduleFixture.get(PrismaService);
    jwt = moduleFixture.get(JwtService);

    await app.init();

    user = {
      id: randomUUID(),
      name: 'Gabriel Teodoro',
      email: 'gabriel@email.com',
    };

    await prisma.user.create({
      data: user,
    });
  });

  test('/users(GET)', async () => {
    const token = jwt.sign(user);

    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
  });
});
