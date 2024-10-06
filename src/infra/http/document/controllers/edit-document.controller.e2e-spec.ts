import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { DatabaseModule } from '@/infra/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

describe('EditDocumentController', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  let user: any;
  let document: any;

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

    document = {
      id: randomUUID(),
      name: 'Document 1',
      status: 'active',
      userId: user.id,
    };

    await prisma.document.create({
      data: document,
    });
  });

  test('/documents/:id (PUT)', async () => {
    const token = jwt.sign(user);

    const response = await request(app.getHttpServer())
      .put(`/documents/${document.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated document',
        status: 'inactive',
      });

    const responseGet = await request(app.getHttpServer())
      .get(`/documents/${document.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(204);
    expect(responseGet.body).toHaveProperty('name', 'Updated document');
    expect(responseGet.body).toHaveProperty('status', 'inactive');
  });
});
