import { test } from '../../../fixtures/baseTest';
import { readCSVData } from '../../../helperUtils/csvUtils';
const csvData = readCSVData('src/testFiles/studentData.csv');


/**
 * Forms Tests - Data from CSV
 *
 * Features:
 * 1. Data-driven testing: Reads multiple student entries data set from a CSV file.
 * 2. Reusable POM methods: All form interactions (inputOnField, selectRadioButton, inputSubjects, selectHobbies, etc.)
 *    are encapsulated in page objects, making the test clean and maintainable.
 * 3. Robust handling of optional fields: Fields like file upload, subjects, and hobbies are handled gracefully; 
 *    the test continues even if values are missing.
 * 4. Step reporting: Each interaction is wrapped in test.step(), which logs the step in the Playwright report.
 * 5. Dynamic dropdown handling: For dependent dropdowns (e.g., State → City), the test waits for the list to refresh 
 *    before selecting the dependent value.
 * 6. Meaningful error messages: Guards and descriptive error logs help identify exactly which step failed.
 */


test.describe('Forms Tests - Data from CSV', () => {
  for (const data of csvData) {
    test(`Submit Student Form - ${data.firstName} ${data.lastName}`, async ({ commonUserAction, formsPage }) => {
      await commonUserAction.inputOnField('First Name', data.firstName);
      await commonUserAction.inputOnField('Last Name', data.lastName);
      await commonUserAction.inputOnField('Email', data.email);
      await commonUserAction.selectRadioButton(data.gender);
      await commonUserAction.inputOnField('Mobile', data.mobile);
      await commonUserAction.selectDate('Date of Birth', data.dob);
      await formsPage.inputSubjects(data.subjects);
      await formsPage.selectHobbies(data.hobbies);
      await formsPage.uploadFile(data.file, false); // false for optional file upload for data set without file names for upload
      await commonUserAction.inputOnField('Current Address', data.address);
      await formsPage.selectDropdownStateAndCity(data.state, data.city);
      await commonUserAction.clickOnButton('Submit');
      await formsPage.verifyFormSubmissionSuccess('Thanks for submitting the form');
    });
  }
});

