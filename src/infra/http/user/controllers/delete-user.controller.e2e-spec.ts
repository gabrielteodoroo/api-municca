import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { DatabaseModule } from '@/infra/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

describe('DeleteUserController', () => {
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
      name: 'admin',
      email: 'admin@email.com',
    };

    await prisma.user.create({
      data: user,
    });
  });

  test('/users/:id (DELETE)', async () => {
    const token = jwt.sign(user);

    const id = randomUUID();

    await prisma.user.create({
      data: {
        id,
        name: 'gabriel',
        email: 'gabriel@email.com',
      },
    });

    const document = {
      id: randomUUID(),
      name: 'Document 1',
      status: 'active',
      userId: id,
    };

    await prisma.document.create({
      data: document,
    });

    const response = await request(app.getHttpServer())
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(204);
  });
});
