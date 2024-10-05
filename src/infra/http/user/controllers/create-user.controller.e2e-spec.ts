import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('Create user controller', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = moduleFixture.get(PrismaService);

    await app.init();
  });

  test('/users (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'Gabriel Teodoro',
      email: 'gabriel@email.com',
    });

    expect(response.statusCode).toBe(201);
  });
});
