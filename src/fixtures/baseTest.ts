import { test as base, expect } from '@playwright/test';
import { CommonUserActionsPage } from '../pages/commonUserActionsPage';
import { WebTablePage } from '../pages/webTablePage';
import { DataGenerator } from '../helperUtils/dataGenerator';
import { FormsPage } from '../pages/formsPage';
import { SelectMenuPage } from '../pages/selectMenuPage';

export const test = base.extend<{
  commonUserAction: CommonUserActionsPage;
  webTablePage: WebTablePage;
  testData: DataGenerator;
  formsPage: FormsPage;
  selectMenuPage: SelectMenuPage;
}>({
  commonUserAction: async ({ page }, use) => {
    await use(new CommonUserActionsPage(page));
  },

  webTablePage: async ({ page }, use) => {
    await page.goto('/webtables');
    await use(new WebTablePage(page));
  },

  testData: async ({}, use) => {
    // Create a new instance of DataGenerator (includes all random fields)
    await use(new DataGenerator());
  },

  formsPage: async ({ page }, use) => {
    await page.goto('/');
    await page.getByRole('heading', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'practice form' }).click();
    await use(new FormsPage(page));
  },


  selectMenuPage: async ({ page }, use) => {
    await page.goto('/');
    await page.getByRole('heading', { name: 'Widgets' }).click();
    await page.getByRole('link', { name: 'select menu' }).click();
    await use(new SelectMenuPage(page));
  },


});

export { expect };
