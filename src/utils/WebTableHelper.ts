import { expect, Page, Locator, test } from '@playwright/test';

type MatchMode = 'exact' | 'partial';

export class WebTableHelper {
  constructor(private page: Page) {}

  // 🔹 Normalize text
  private normalize(text: string) {
    return text.toLowerCase().trim();
  }

  // 🔹 Match logic (exact / partial)
  private match(a: string, b: string, mode: MatchMode) {
    const A = this.normalize(a);
    const B = this.normalize(b);

    return mode === 'exact' ? A === B : A.includes(B);
  }




  // 🔹 Get headers
  async getHeaders(): Promise<string[]> {
    return await test.step('Get table headers', async () => {
        // const headers = await this.page.getByRole('columnheader').allInnerTexts();
        const headers = await this.page.locator('table thead th').allInnerTexts();  
        console.log('Table headers:', headers);
        return headers.map(h => h.trim());
    });
  }




  // 🔹 Get column index (robust)
  async getColumnIndex(columnName: string, mode: MatchMode = 'partial'): Promise<number> {
    return await test.step(`Find column index for "${columnName}" (mode: ${mode})`, async () => {
        const headers = await this.getHeaders();
        const index = headers.findIndex(h =>
        this.match(h, columnName, mode)
        );

        if (index === -1) {
        throw new Error(
            `Column "${columnName}" not found.\nAvailable: ${headers.join(', ')}`
        );
        }

        console.log(`Found column "${columnName}" at index ${index} (mode: ${mode})`);

        return index;
    });
  }




  // 🔹 Get row with retry
  async getRow(rowText: string, options?: { timeout?: number; mode?: MatchMode }): Promise<Locator> {
    return await test.step(`Find row with text "${rowText}"`, async () => {
        const timeout = options?.timeout ?? 5000;
        const mode = options?.mode ?? 'partial';

        const start = Date.now();

        while (Date.now() - start < timeout) {
        const rows = this.page.getByRole('row');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const text = (await row.innerText()).trim();

            if (this.match(text, rowText, mode)) {
            return row;
            }
        }

        await this.page.waitForTimeout(300); // retry
        }

        const allRows = await this.page.getByRole('row').allInnerTexts();
        console.log('Available rows:', allRows);

        throw new Error(
        `Row "${rowText}" not found after ${timeout}ms\nAvailable:\n${allRows.join('\n')}`
        );
    });

  }




  // 🔹 Get cell value (with retry + logging)
  async getCellValue(
    rowText: string,
    columnName: string,
    options?: {
      timeout?: number;
      matchMode?: MatchMode;
      columnMatchMode?: MatchMode;
    }
  ): Promise<string | null> {
    return await test.step(`Get cell value at [${rowText} → ${columnName}]`, async () => {
        const row = await this.getRow(rowText, {
        timeout: options?.timeout,
        mode: options?.matchMode ?? 'partial',
        });

        const colIndex = await this.getColumnIndex(
        columnName,
        options?.columnMatchMode ?? 'partial'
        );

        const cell = row.getByRole('cell').nth(colIndex);

        await expect(cell).toBeVisible();

        const value = (await cell.textContent())?.trim() || null;

        // 🔹 Console log
        console.log(`The cell [${rowText}] -> in row [${columnName}] = ${value}`);

        // 🔹 Attach to Playwright report
        await test.info().attach('table-log', {
        body: `Row: ${rowText}\nColumn: ${columnName}\nValue: ${value}`,
        contentType: 'text/plain',
        });

        return value;
    });
  }





  // 🔹 Click action inside cell
  async clickCellAction( rowText: string, columnName: string, buttonName: string ) {
    await test.step(`Click "${buttonName}" in [${rowText} → ${columnName}]`, async () => {
        const row = await this.getRow(rowText);
        const colIndex = await this.getColumnIndex(columnName);
        const button = row.getByRole('cell').nth(colIndex).locator(`[title="${buttonName}"]`);
        expect(button).toBeVisible();
        await button.click();
        console.log(`Clicked "${buttonName}" in [${rowText} → ${columnName} column]`);
    });
  }




  // 🔹 Get all column values
  async getColumnValues(columnName: string): Promise<string[]> {
    return await test.step(`Get all values from column "${columnName}"`, async () => {
        const colIndex = await this.getColumnIndex(columnName, 'partial');
        const rows = this.page.getByRole('row');
        const count = await rows.count();
        const values: string[] = [];

        for (let i = 1; i < count; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(colIndex);
        const text = (await cell.textContent())?.trim();
        if (text) values.push(text);
        }

        console.log(`Column "${columnName}" values:`, values);

        return values;
    });
  }




}