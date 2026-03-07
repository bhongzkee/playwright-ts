import fs from 'fs';
import { parse } from 'csv-parse/sync';

/**
 * Reads data from a CSV file and returns it as an array of objects.
 *
 * Example:
 *   const data = readCSVData('src/test-data/studentData.csv');
 *   → [ { firstName: 'John', lastName: 'Doe', ... }, ... ]
 *
 * @param {string} filePath - The relative or absolute path to the CSV file.
 * @returns {Array<Record<string, string>>} Array of row objects.
 */
export function readCSVData(filePath: string): Array<Record<string, string>> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const records = parse<Record<string, string>>(content, {
    columns: true, // treat first row as headers
    skip_empty_lines: true,
    trim: true,
  });

  return records;
}
