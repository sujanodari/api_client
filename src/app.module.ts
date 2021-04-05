import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envirnoment from './config/envirnoment';
import { UsersModule } from './user/users.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envirnoment],
      envFilePath: !ENV ? '.env.dev' : `.env.${ENV}`,
    }),
  ],
})
export class AppModule {}
