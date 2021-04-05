import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { CsvService } from '../common/csv.service';
import { PaginationService } from '../common/pagination.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  imports: [CsvModule],
  controllers: [UsersController],
  providers: [UsersService, PaginationService, CsvService],
  exports: [UsersService],
})
export class UsersModule {}
