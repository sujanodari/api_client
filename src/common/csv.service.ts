import { Injectable } from '@nestjs/common';
import { json2csvAsync } from 'json-2-csv';
import { ICsv } from './interfaces/csv.interface';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CsvService {
  constructor(private readonly csvParser: CsvParser) {}

  /**
   * Generate Csv file
   * @param {Object} csvArg
   * @param {Object} csvArg.jsonData
   * @param {string} csvArg.filePath
   */
  public async generateCsv(csvArg: ICsv) {
    let jsonData = csvArg.jsonData;
    const filePath = csvArg.filePath;
    const id = uuidv4();
    jsonData = { ...jsonData, id };
    let prependHeader;
    try {
      await this.checkCsvExist(filePath);
      prependHeader = false;
    } catch (err) {
      prependHeader = true;
    }
    json2csvAsync(jsonData, { prependHeader }).then((csvData) => {
      try {
        const csvLog = fs.createWriteStream(filePath, { flags: 'a' });
        csvLog.write(csvData + '\n');
        csvLog.end();
      } catch (err) {
        throw err;
      }
    });
  }

  /**
   * Read Csv file
   * @param {Object} csvArg
   * @param {Any} csvArg.Entity
   * @param {string} csvArg.filePath
   * @param {number} csvArg.count
   * @param {number} csvArg.offset
   * @returns {ParsedData<any>}
   */

  public async readCsv(csvArg) {
    const { Entity, filePath, count, offset } = csvArg;
    try {
      await this.checkCsvExist(filePath);
      const stream = fs.createReadStream(filePath);
      const csvConfig = { strict: true, separator: ',' };
      try {
        const entities = await this.csvParser.parse(
          stream,
          Entity,
          count,
          offset,
          csvConfig,
        );
        return entities;
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Check if Csv file exist
   * @param {string} filePath
   * @returns {Promise<Boolean>}
   */
  public async checkCsvExist(filePath) {
    return new Promise((resolve, reject) => {
      fs.access(filePath, (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
