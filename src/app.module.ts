import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envirnoment from './config/envirnoment';
import { UsersModule } from './user/users.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envirnoment],
      envFilePath: !envirnoment().env
        ? '.env.dev'
        : `.env.${envirnoment().env}`,
    }),
  ],
})
export class AppModule {}
