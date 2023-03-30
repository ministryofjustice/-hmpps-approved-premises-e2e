import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const clickSave = async () => {
    await page.getByRole('button', { name: 'Save and continue' }).click();
  }

  const sixMonths = 1000 * 60 * 60 * 24 * 7 * 4 * 6;
  const releaseDate = new Date(new Date().getTime() + sixMonths)

  await page.goto('https://approved-premises-dev.hmpps.service.justice.gov.uk');
  await page.getByLabel('Username').fill(process.env.HMPPS_AUTH_USERNAME as string);
  await page.getByLabel('Password').fill(process.env.HMPPS_AUTH_PASSWORD as string);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('link', { name: 'Apply for an Approved Premises placement' }).click();

  await page.getByRole('button', { name: 'Start now' }).click();
  await page.getByRole('button', { name: 'Start now' }).click();

  await page.getByLabel("Enter the person's CRN").fill('X371199');
  await clickSave();

  await clickSave();

  await page.getByLabel('Yes').check();
  await clickSave();

  await page.getByLabel('Yes').check();
  await page.getByLabel('Name of senior manager').fill('Some text');
  await page.getByLabel('Day').fill('12');
  await page.getByLabel('Month').fill('3');
  await page.getByLabel('Year').fill('2022');
  await page.getByLabel('Provide a summary of the reasons why this is an exempt application').fill('Some text');
  await clickSave();

  await page.getByLabel('Standard determinate custody').check();
  await clickSave();

  await page.getByLabel('Licence', { exact: true }).check();
  await clickSave();

  await page.getByLabel('Yes').check();
  await page.getByLabel('Day').fill(releaseDate.getDate().toString());
  await page.getByLabel('Month').fill((releaseDate.getMonth() + 1).toString());
  await page.getByLabel('Year').fill(releaseDate.getFullYear().toString());
  await clickSave();

  await page.getByLabel('Yes').check();
  await clickSave();

  await page.getByLabel('Public protection').check();
  await page.getByLabel('Prevent contact with known individuals or victims').check();
  await clickSave();

  await page.getByRole('link', { name: 'Type of AP required' }).click();
  await page.getByText('Standard AP', { exact: true }).click();
  await clickSave();

  await page.getByRole('link', { name: 'Choose sections of OASys to import' }).click();
  await page.getByLabel('3. Accommodation').check();
  await page.getByLabel('13. Health').check();
  await page.getByLabel('4. Education, training and employment').check();
  await clickSave();
  await clickSave();
  await clickSave();
  await clickSave();
  await clickSave();
  await clickSave();

  await page.getByRole('link', { name: 'Add detail about managing risks and needs' }).click();

  await page.getByLabel('Describe why an AP placement is needed to manage the risk of Ben Davies').fill('Some text');
  await page.getByLabel('Provide details of any additional measures that will be necessary for the management of risk').fill('Some text');
  await clickSave();

  await page.getByLabel('No').check();
  await clickSave();

  await page.getByLabel('Health').check();
  await page.getByLabel('Children and families').check();
  await page.getByText('Accommodation Drugs and alcohol Children and families Health Education, training').click();
  await page.getByLabel('Finance, benefits and debt').check();
  await clickSave();

  await page.getByRole('link', { name: 'Review prison information' }).click();
  await page.getByLabel('Select case note from Thursday 21 April 2022').check();
  await page.getByRole('tab', { name: 'Adjudications' }).click();
  await page.getByRole('tab', { name: 'ACCT' }).click();
  await page.getByRole('tab', { name: 'Prison case notes' }).click();
  await clickSave();

  await page.getByRole('link', { name: 'Describe location factors' }).click();
  await page.getByLabel('What is the preferred postcode area for the Approved Premises (AP) placement?').fill('B71');
  await page.getByLabel('Give details of why this postcode area would benefit the person').fill('Some text');
  await page.getByRole('group', { name: 'If an AP Placement is not available in the persons preferred area, would a placement further away be considered?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Are there any restrictions linked to placement location?' }).getByLabel('No').check();
  await clickSave();

  await page.getByRole('link', { name: 'Add access, cultural and healthcare needs' }).click();
  await page.getByLabel('None of the above').check();
  await page.getByRole('group', { name: 'Does Ben Davies have any religious or cultural needs?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Does Ben Davies need an interpreter?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Has a care act assessment been completed?' }).getByLabel('No', { exact: true }).check();
  await clickSave();

  await page.getByRole('group', { name: 'Has Ben Davies been fully vaccinated for COVID-19?' }).getByLabel('No', { exact: true }).check();
  await page.getByRole('group', { name: 'Is Ben Davies at a higher risk from COVID-19 based on the NHS guidance?' }).getByLabel('No', { exact: true }).click();
  await clickSave();

  await page.getByRole('link', { name: 'Detail further considerations for placement' }).click();
  await page.getByRole('group', { name: 'Is there any evidence that the person may pose a risk to AP staff?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Is there any evidence that the person may pose a risk to other AP residents?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Do you have any concerns about the person sharing a bedroom?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Is there any evidence of previous trauma or significant event in the persons history which would indicate that room share may not be suitable?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Is there potential for the person to benefit from a room share?' }).getByLabel('No').check();
  await clickSave();

  await page.getByRole('group', { name: 'Are you aware that Ben Davies is vulnerable to exploitation from others?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'Is there any evidence or expectation that Ben Davies may groom, radicalise or exploit others?' }).getByLabel('No').check();
  await clickSave();

  await page.getByLabel('No', { exact: true }).check();
  await clickSave();

  await page.getByLabel('No').check();
  await clickSave();

  await page.getByLabel('No').check();
  await clickSave();

  await page.getByLabel('No').check();
  await clickSave();

  await page.getByRole('link', { name: 'Add move on information' }).click();

  await page.getByLabel('Duration in weeks').fill('12');
  await page.getByLabel('Provide any additional information').fill('Some text');
  await clickSave();

  await page.getByLabel('Where is Ben Davies most likely to live when they move on from the AP?').fill('WS1');
  await clickSave();

  await page.getByLabel('No').check();
  await clickSave();

  await page.getByLabel('Living with partner, family or friends').check();
  await clickSave();

  await page.getByRole('link', { name: 'Attach required documents' }).click();
  await clickSave();

  await page.getByRole('link', { name: 'Check your answers' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByLabel('I confirm the information provided is complete, accurate and up to date.').check();
  await page.getByRole('button', { name: 'Submit application' }).click();

  await expect(page.locator('h1.govuk-panel__title')).toContainText('Application confirmation')
});
