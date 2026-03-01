/**
 * WebTablePageLocators
 *
 * Dynamic XPath locators for elements on the Web Table Page.
 * Each locator is a function that returns a selector string
 * based on the provided parameter.
 */
export const WebTablePageLocators = {

  /**
   * Returns the XPath locator for the Edit icon within a specific item row
   * on the Web Table Page web table.
   *
   * Usage:
   *   const locator = WebTablePageLocators.webTableRowEditLocator("John Doe");
   *   await page.click(locator);
   *
   * @param {string} itemRowName - The name (or partial text) of the table row to locate.
   * @returns {string} XPath locator for the edit icon in the specified row.
   */
  webTableRowEditLocator: (itemRowName: string): string =>
    // `//div[@role="row"][contains(normalize-space(.), "${itemRowName.replace(/"/g, '\\"')}")]//span[contains(@id, "edit-record")]`,
    `//tr[contains(string(), "${itemRowName}")]//*[@title="Edit"]`,

  /**
   * Locator for all column headers.
   *
   * Usage:
   *   const headers = await page.$$(WebTablePageLocators.webTableColumnHeaderLocator());
   *
   * @returns {string} XPath locator for all column headers.
   */
  webTableColumnHeaderLocator: (): string => '//tr/th',

  /**
   * Locator for a specific cell in a row by row name and column index.
   *
   * Usage:
   *   const cellLocator = WebTablePageLocators.webTableCellLocator("John Doe", 3);
   *   const text = await page.textContent(cellLocator);
   *
   * @param {string} rowName - Visible text in the row.
   * @param {number} columnIndex - 1-based index of the column.
   * @returns {string} XPath locator for the specified cell.
   */
  webTableCellLocator: (rowName: string, columnIndex: number): string =>
    // `//div[@role="row"][contains(normalize-space(.), "${rowName}")]//div[@role="gridcell"][${columnIndex}]`,
    `//tr/td[${columnIndex}][contains(normalize-space(.), "${rowName}")]`,

  /**
   * Locator for all rows in the web table that have an edit icon.
   *
   * Usage:
   *   const rows = await page.$$(WebTablePageLocators.webTableRowsLocator());
   *
   * @returns {string} XPath locator for all editable rows.
   */
  webTableRowsLocator: (): string =>
    // '//div[@class="rt-tr-group"][@role="rowgroup"][.//span[contains(@id, "edit-record")]]',
    '//tbody/tr',

  /**
   * Locator for the first cell (usually First Name) of all rows in the web table.
   *
   * Usage:
   *   const firstNames = await page.$$(WebTablePageLocators.webTableRowFirstNameLocator());
   *
   * @returns {string} XPath locator for first cell in each editable row.
   */
  webTableRowFirstNameLocator: (): string =>
    // '(//div[@class="rt-tr-group"][@role="rowgroup"]/div[@role="row"][.//span[contains(@id, "edit-record")]]/div[@role="gridcell"][1])',
    '//tbody/tr[1]',
};
