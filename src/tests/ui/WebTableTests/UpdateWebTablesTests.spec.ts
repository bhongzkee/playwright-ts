import { test, expect } from '../../../fixtures/baseTest';
import type { CommonUserActionsPage } from '../../../pages/commonUserActionsPage';
import type { WebTablePage } from '../../../pages/webTablePage';
import type { DataGenerator } from '../../../helperUtils/dataGenerator';
import { WebTableHelper } from '../../../helperUtils/WebTableHelper';




/**
 * Web Table Tests - Update Table Cell Values
 *
 * Features:
 * 1. Randomized row selection: Each test picks a random existing row from the table to avoid hard-coded dependencies.
 * 2. Data-driven updates: Uses dynamically generated test data (via DataGenerator) for fields like firstName, lastName, email, etc.
 * 3. Reusable POM methods: All table interactions (clickOnTableRowEditIcon, inputOnTextField, verifyTableCellValue, etc.) 
 *    are encapsulated in page objects for maintainability.
 * 4. Step reporting: Each update and verification step is wrapped in test.step(), producing detailed and readable Playwright reports.
 * 5. Meaningful error messages: Verification and guard clauses provide descriptive feedback for failures, including expected vs actual values.
 * 6. Validation: After each edit, the table cell is checked to ensure the new value is saved and displayed correctly.
 */


test.describe('Web Table Tests - Update Table Cell Values', () => {
  let commonUserAction: CommonUserActionsPage;
  let webTablePage: WebTablePage;
  let testData: DataGenerator;
  let rowName: string;
  let webTableHelper: WebTableHelper;

  test.beforeEach(async ({ page, commonUserAction: fixtureCommon, webTablePage: fixtureTable, testData: fixtureData }) => {
    commonUserAction = fixtureCommon;
    webTablePage = fixtureTable;
    testData = fixtureData;
    rowName = await webTablePage.getRandomRowName();  // Get a random existing row name from the table before each test
    webTableHelper = new WebTableHelper(page); // Initialize WebTableHelper with the current page
  });
  

  test('Table Cell First Name Should Be Updated', async ({page}) => {
    await webTablePage.clickOnTableRowActionIcon(rowName, 'Action', 'Edit');
    await commonUserAction.inputOnTextField('First Name', testData.randomString);
    await commonUserAction.clickOnButton('Submit');  
    await webTablePage.verifyTableCellValue(testData.randomString, 'First Name', testData.randomString);
  });

  test('Table Cell Last Name Should Be Updated', async () => {
    await webTablePage.clickOnTableRowActionIcon(rowName, 'Action', 'Edit');
    await commonUserAction.inputOnTextField('Last Name', testData.randomString);
    await commonUserAction.clickOnButton('Submit');
    await webTablePage.verifyTableCellValue(rowName, 'Last Name', testData.randomString);
  });

  test('Table Cell Email Should Be Updated', async () => {
    await webTablePage.clickOnTableRowActionIcon(rowName, 'Action', 'Edit');
    await commonUserAction.inputOnTextField('Email', testData.email);
    await commonUserAction.clickOnButton('Submit');
    await webTablePage.verifyTableCellValue(rowName, 'Email', testData.email);
    await webTablePage.getRandomRowName();
  });

  test('Table Cell Department Should Be Updated', async () => {
    await webTablePage.clickOnTableRowActionIcon(rowName, 'Action', 'Edit');
    await commonUserAction.inputOnTextField('Department', testData.randomString);
    await commonUserAction.clickOnButton('Submit');
    await webTablePage.verifyTableCellValue(rowName, 'Department', testData.randomString);
  });

  test('Table Cell Age Should Be Updated', async () => {
    await webTablePage.clickOnTableRowActionIcon(rowName, 'Action', 'Edit');
    await commonUserAction.inputOnTextField('Age', testData.age);
    await commonUserAction.clickOnButton('Submit');
    await webTablePage.verifyTableCellValue(rowName, 'Age', testData.age);
  });

  test('Table Cell Salary Should Be Updated', async () => {
    await webTablePage.clickOnTableRowActionIcon(rowName, 'Action', 'Edit');
    await commonUserAction.inputOnTextField('Salary', testData.salary);
    await commonUserAction.clickOnButton('Submit');
    await webTablePage.verifyTableCellValue(rowName, 'Salary', testData.salary);
  });



});
