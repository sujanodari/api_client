import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import { ConfigModule } from '@nestjs/config';
import envirnoment from '../config/envirnoment';
const ENV = process.env.NODE_ENV;
describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({
          load: [envirnoment],
          envFilePath: `.env.${ENV}`,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    fs.unlink(envirnoment().csvFile, (err) => {
      if (err) {
      } else {
      }
    });
  });

  it('/ (POST) create new client.', () => {
    const user: CreateUserDto = {
      name: 'Sujan',
      gender: 'Male',
      age: 23,
      phone: '1234567890',
      email: 'email@test.com',
      address: 'Annamnagar',
      dob: '2021-03-17',
      nationality: 'Nepali',
      educationBackground: [
        {
          organization: 'Softwarica',
          level: 'Batchlor',
          startYear: 2016,
          endYear: 2020,
        },
      ],
    };

    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send(user)
      .expect(HttpStatus.CREATED);
  });

  it('/ (GET) all client.', () => {
    return request(app.getHttpServer()).get('/users').expect(HttpStatus.OK);
  });
});
