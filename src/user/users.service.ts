import { Injectable } from '@nestjs/common';
import { CsvService } from '../common/csv.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { IPaginationResponse } from '../common/interfaces/pagination.interface';
import { PaginationService } from '../common/pagination.service';
import { IUser } from './interfaces/user.interface';
import envirnoment from '../config/envirnoment';

class Entity {
  id: string;
  name: string;
  gender: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  dob: string;
  nationality: string;
  educationBackground: [
    { organization: string; level: string; startYear: number; endYear: number },
  ];
}

@Injectable()
export class UsersService {
  constructor(
    private paginationService: PaginationService,
    private csvService: CsvService,
  ) {}

  private filePath = envirnoment().csvFile;

  /**
   * Create user
   * @param {object} newUser
   * @param {string} newUser.name
   * @param {string} newUser.gender
   * @param {number} newUser.age
   * @param {string} newUser.phone
   * @param {string} newUser.email
   * @param {string} newUser.address
   * @param {string} newUser.dob
   * @param {string} newUser.nationality
   * @param {object} newUser.educationBackground
   * @param {string} newUser.educationBackground.organization
   * @param {string} newUser.educationBackground.level
   * @param {number} newUser.educationBackground.startYear
   * @param {number} newUser.educationBackground.endYear
   *
   */
  public async create(newUser) {
    const user = await this.findByEmail(newUser.email);
    if (user) {
      throw new Error('User already exist, please provide new email');
    }
    const filePath = this.filePath;
    const jsonData = newUser;
    await this.csvService.generateCsv({ jsonData, filePath });
  }

  /**
   * Find all users
   * @param {object|null} paginationQuery
   * @param {number} paginationQuery.limit
   * @param {number} paginationQuery.offset
   */
  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<IPaginationResponse<IUser>> {
    const offset = paginationQuery?.offset;
    const limit = paginationQuery?.limit;
    const filePath = this.filePath;
    try {
      const data = await this.csvService.readCsv({
        Entity,
        filePath,
        count: limit,
        offset,
      });
      const paging = await this.paginationService.getPaginationResult({
        limit: data?.count,
        offset: data?.offset,
        total: data?.total,
      });
      return { data: data?.list, paging: paging };
    } catch (err) {
      throw new Error('No user!');
    }
  }

  /**
   * Find user by email
   * @param {string} email
   * @returns {Promise<IUser>}
   */
  public async findByEmail(email: string): Promise<IUser> {
    const filePath = this.filePath;
    try {
      const data = await this.csvService.readCsv({
        Entity,
        filePath,
      });
      return data?.list.find((user) => user.email == email);
    } catch (err) {
      return;
    }
  }
}
