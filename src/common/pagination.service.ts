import { Injectable } from '@nestjs/common';

import { IPagination, IPaging } from './interfaces/pagination.interface';

@Injectable()
export class PaginationService {
  /**
   * Get pagination result
   * @param {object} pagination
   * @param {number} pagination.limit
   * @param {number} pagination.offset
   * @param {number} pagination.total
   * @returns {Promise<IPaging>}
   */
  public async getPaginationResult(pagination: IPagination): Promise<IPaging> {
    const total = pagination.total;
    const startIndex = pagination.offset;
    const hasNextPage =
      pagination.total <= Number(pagination.limit) + Number(pagination.offset)
        ? false
        : true;
    let endIndex = startIndex + pagination.limit - 1;
    endIndex = endIndex >= total ? total - 1 : endIndex;
    endIndex = endIndex < 0 ? 0 : endIndex;
    return {
      hasNextPage,
      endIndex,
      total,
      startIndex,
    };
  }
}
