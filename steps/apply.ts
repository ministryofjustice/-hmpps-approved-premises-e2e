import { Page } from '@playwright/test'
import {
  ApplyPage,
  CRNPage,
  CheckYourAnswersPage,
  ConfirmPersonPage,
  ConfirmationPage,
  DashboardPage,
  ListPage,
  StartPage,
  TasklistPage,
} from '../pages/apply'

export const visitDashboard = async (page: Page): Promise<DashboardPage> => {
  const dashboard = new DashboardPage(page)
  await dashboard.goto()

  return dashboard
}

export const startAnApplication = async (dashboard: DashboardPage, page: Page) => {
  await dashboard.clickApply()

  const listPage = new ListPage(page)
  await listPage.startApplication()

  const startPage = new StartPage(page)
  await startPage.createApplication()
}

export const enterAndConfirmCrn = async (page: Page, crn: string, indexOffenceRequired: boolean) => {
  const crnPage = new CRNPage(page)
  await crnPage.enterCrn(crn)
  await crnPage.clickSave()

  const confirmPersonPage = new ConfirmPersonPage(page)
  await confirmPersonPage.clickSave()

  if (indexOffenceRequired) {
    await page.getByLabel('Select Murder - Murder of infants under 1 year of age as index offence').click()
    await confirmPersonPage.clickSave()
  }
}

export const completeBasicInformationTask = async (page: Page, personName: string, withReleaseDate = true) => {
  const notEligiblePage = await ApplyPage.initialize(page, 'This application is not eligible')
  await notEligiblePage.checkRadio('Yes')
  await notEligiblePage.clickSave()

  const exemptionApplicationPage = await ApplyPage.initialize(page, 'Provide details for exemption application')
  await exemptionApplicationPage.checkRadio('Yes')
  await exemptionApplicationPage.fillField('Name of senior manager', 'Some text')
  await exemptionApplicationPage.fillDateField({ year: '2022', month: '3', day: '12' })
  await exemptionApplicationPage.fillField(
    'Provide a summary of the reasons why this is an exempt application',
    'Some text',
  )
  await exemptionApplicationPage.clickSave()

  const transgenderPage = await ApplyPage.initialize(
    page,
    `Is ${personName} transgender or do they have a transgender history?`,
  )
  await transgenderPage.checkRadio('No')
  await transgenderPage.clickSave()

  const sentenceTypePage = await ApplyPage.initialize(
    page,
    'Which of the following best describes the sentence type the person is on?',
  )
  await sentenceTypePage.checkRadio('Standard determinate custody')
  await sentenceTypePage.clickSave()

  const releaseTypePage = await ApplyPage.initialize(page, 'What type of release will the application support?')
  await releaseTypePage.checkRadio('Licence')
  await releaseTypePage.clickSave()

  const releaseDatePage = await ApplyPage.initialize(page, `Do you know ${personName}’s release date?`)

  if (withReleaseDate) {
    await releaseDatePage.checkRadio('Yes')
    await releaseDatePage.fillReleaseDateField()
    await releaseDatePage.clickSave()

    const placementDatePage = await ApplyPage.initialize(page)
    await placementDatePage.checkRadio('Yes')
    await placementDatePage.clickSave()
  } else {
    await releaseDatePage.checkRadio('No, the release date is to be determined by the parole board or other hearing')
    await releaseDatePage.clickSave()

    const oralHearingDatePage = await ApplyPage.initialize(page, `Do you know ${personName}’s oral hearing date?`)
    await oralHearingDatePage.checkRadio('No')
    await oralHearingDatePage.clickSave()
  }

  const purposePage = await ApplyPage.initialize(page, 'What is the purpose of the Approved Premises (AP) placement?')
  await purposePage.checkCheckBoxes(['Public protection', 'Prevent contact with known individuals or victims'])
  await purposePage.clickSave()
}

export const completeTypeOfApTask = async (page: Page, personName: string) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Type of AP required')

  const typeOfApPage = await ApplyPage.initialize(page, `Which type of AP does ${personName} require?`)
  await typeOfApPage.checkRadio('Standard AP')
  await typeOfApPage.clickSave()
}

export const completeOasysImportTask = async (page: Page, oasysSections: Array<string>) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Choose sections of OASys to import')

  const oasysPage = await ApplyPage.initialize(page, 'Which of the following sections of OASys do you want to import?')
  await oasysPage.checkCheckBoxes(oasysSections)
  await oasysPage.clickSave()

  const roshSummaryPage = await ApplyPage.initialize(page)
  await roshSummaryPage.clickSave()

  const offenceAnalysisPage = await ApplyPage.initialize(page)
  await offenceAnalysisPage.clickSave()

  const supportingInformationPage = await ApplyPage.initialize(page)
  await supportingInformationPage.clickSave()

  const riskManagementPage = await ApplyPage.initialize(page)
  await riskManagementPage.clickSave()

  const riskToSelfPage = await ApplyPage.initialize(page)
  await riskToSelfPage.clickSave()
}

export const completeRisksAndNeedsTask = async (page: Page, personName: string) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Add detail about managing risks and needs')

  const riskManagementFeaturesPage = await ApplyPage.initialize(
    page,
    'What features of an Approved Premises (AP) will support the management of risk?',
  )
  await riskManagementFeaturesPage.fillField(
    `Describe why an AP placement is needed to manage the risk of ${personName}`,
    'Some text',
  )
  await riskManagementFeaturesPage.fillField(
    'Provide details of any additional measures that will be necessary for the management of risk',
    'Some text',
  )
  await riskManagementFeaturesPage.clickSave()

  const convictedOffencesPage = await ApplyPage.initialize(
    page,
    `Has ${personName} ever been convicted of the following offences?`,
  )
  await convictedOffencesPage.checkRadio('No')
  await convictedOffencesPage.clickSave()

  const rehabilativeActivitiesPage = await ApplyPage.initialize(
    page,
    "Which of the rehabilitative activities will assist the person's rehabilitation in the Approved Premises (AP)?",
  )
  await rehabilativeActivitiesPage.checkCheckBoxes(['Health', 'Children and families', 'Finance, benefits and debt'])
  await rehabilativeActivitiesPage.fillField(
    'Provide a summary of how these interventions will assist the persons rehabilitation in the AP.',
    'Some text',
  )
  await rehabilativeActivitiesPage.clickSave()
}

export const completePrisonNotesTask = async (page: Page) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Review prison information')

  const prisonInformationPage = await ApplyPage.initialize(page, 'Prison information')
  // TODO once this CRN has prison case notes again
  // await prisonInformationPage.checkCheckBoxes(['Select case note from Thursday 21 April 2022'])
  await prisonInformationPage.clickTab('Adjudications')
  await prisonInformationPage.clickTab('ACCT')
  await prisonInformationPage.clickTab('Prison case notes')
  await prisonInformationPage.clickSave()
}

export const completeLocationFactorsTask = async (page: Page) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Describe location factors')

  const locationFactorsPage = await ApplyPage.initialize(page, 'Location factors')
  await locationFactorsPage.fillField(
    'What is the preferred postcode area for the Approved Premises (AP) placement?',
    'B71',
  )
  await locationFactorsPage.fillField('Give details of why this postcode area would benefit the person', 'Some text')
  await locationFactorsPage.checkRadioInGroup(
    'If an AP Placement is not available in the persons preferred area, would a placement further away be considered?',
    'No',
  )
  await locationFactorsPage.checkRadioInGroup('Are there any restrictions linked to placement location?', 'No')
  await locationFactorsPage.clickSave()
}

export const completeAccessCulturalAndHealthcareTask = async (page: Page, personName: string) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Add access, cultural and healthcare needs')

  const accessNeedsPage = await ApplyPage.initialize(page, 'Access, cultural and healthcare needs')
  await accessNeedsPage.checkCheckBoxes(['None of the above'])
  await accessNeedsPage.checkRadioInGroup(`Does ${personName} have any religious or cultural needs?`, 'No')
  await accessNeedsPage.checkRadioInGroup(`Does ${personName} need an interpreter?`, 'No')
  await accessNeedsPage.checkRadioInGroup('Does this person have care and support needs?', 'No')
  await accessNeedsPage.checkRadioInGroup('Has a care act assessment been completed?', 'No')
  await accessNeedsPage.clickSave()

  const covidPage = await ApplyPage.initialize(page, 'COVID information')
  await covidPage.checkRadioInGroup(`Has ${personName} been fully vaccinated for COVID-19?`, 'No')
  await covidPage.checkRadioInGroup(`Is ${personName} at a higher risk from COVID-19 based on the NHS guidance?`, 'No')
  await covidPage.clickSave()
}

export const completeFurtherConsiderationsTask = async (page: Page, personName: string) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Detail further considerations for placement')

  const roomSharingPage = await ApplyPage.initialize(page, 'Room sharing')
  await roomSharingPage.checkRadioInGroup('Is there any evidence that the person may pose a risk to AP staff?', 'No')
  await roomSharingPage.checkRadioInGroup(
    'Is there any evidence that the person may pose a risk to other AP residents?',
    'No',
  )
  await roomSharingPage.checkRadioInGroup(
    'Is there any evidence that the person may pose a risk to other AP residents?',
    'No',
  )
  await roomSharingPage.checkRadioInGroup('Do you have any concerns about the person sharing a bedroom?', 'No')
  await roomSharingPage.checkRadioInGroup(
    'Is there any evidence of previous trauma or significant event in the persons history which would indicate that room share may not be suitable?',
    'No',
  )
  await roomSharingPage.checkRadioInGroup('Is there potential for the person to benefit from a room share?', 'No')
  await roomSharingPage.clickSave()

  const vulnerabilityPage = await ApplyPage.initialize(page, 'Vulnerability')
  await vulnerabilityPage.checkRadioInGroup(
    `Are you aware that ${personName} is vulnerable to exploitation from others?`,
    'No',
  )
  await vulnerabilityPage.checkRadioInGroup(
    `Is there any evidence or expectation that ${personName} may groom, radicalise or exploit others?`,
    'No',
  )
  await vulnerabilityPage.clickSave()

  const previousPlacementsPage = await ApplyPage.initialize(page, 'Previous Approved Premises (AP) placements')
  await previousPlacementsPage.checkRadio('No')
  await previousPlacementsPage.clickSave()

  const cateringRequirementsPage = await ApplyPage.initialize(page, 'Catering requirements')
  await cateringRequirementsPage.checkRadio('No')
  await cateringRequirementsPage.fillField('Provide details', 'Some details')
  await cateringRequirementsPage.clickSave()

  const arsonPage = await ApplyPage.initialize(page, 'Arson')
  await arsonPage.checkRadio('No')
  await arsonPage.clickSave()

  const additionalCircumstancesPage = await ApplyPage.initialize(page, 'Additional circumstances')
  await additionalCircumstancesPage.checkRadio('No')
  await additionalCircumstancesPage.clickSave()
}

export const completeMoveOnTask = async (page: Page, personName: string) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Add move on information')

  const placementDurationPage = await ApplyPage.initialize(page, 'Placement duration and move on')
  await placementDurationPage.checkRadio('No')
  await placementDurationPage.clickSave()

  const moveOnPage = await ApplyPage.initialize(page, 'Placement duration and move on')
  await moveOnPage.fillField(`Where is ${personName} most likely to live when they move on from the AP?`, 'WS1')
  await moveOnPage.clickSave()

  const moveOnArrangementsPage = await ApplyPage.initialize(page, 'Placement duration and move on')
  await moveOnArrangementsPage.checkRadio('No')
  await moveOnArrangementsPage.fillField(
    'Provide detail about any plans to secure accommodation in preparation for move on',
    'Some text',
  )
  await moveOnArrangementsPage.clickSave()

  const typeOfAccommodationPage = await ApplyPage.initialize(page, 'Placement duration and move on')
  await typeOfAccommodationPage.checkRadio('Living with partner, family or friends')
  await typeOfAccommodationPage.clickSave()
}

export const completeAttachRequiredDocuments = async (page: Page) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Attach required documents')

  const requiredDocumentsPage = await ApplyPage.initialize(
    page,
    'Select any additional documents that are required to support your application',
  )
  await requiredDocumentsPage.clickSave()
}

export const checkApplyAnswers = async (page: Page) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.clickTask('Check your answers')

  const checkYourAnswersPage = await CheckYourAnswersPage.initialize(page)
  await checkYourAnswersPage.clickContinue()
}

export const submitApplication = async (page: Page) => {
  const taskListPage = new TasklistPage(page)
  await taskListPage.submitApplication()
}

export const shouldSeeConfirmationPage = async (page: Page) => {
  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowSuccessMessage()
}

export const createApplication = async (
  { page, person, indexOffenceRequired, oasysSections },
  withReleaseDate: boolean,
) => {
  // Given I visit the Dashboard
  const dashboard = await visitDashboard(page)

  // And I start an application
  await startAnApplication(dashboard, page)

  // And I enter and confirm a CRN
  await enterAndConfirmCrn(page, person.crn, indexOffenceRequired)

  // And I complete the basic information Task
  await completeBasicInformationTask(page, person.name, withReleaseDate)

  // And I complete the Type of AP Task
  await completeTypeOfApTask(page, person.name)

  // And I complete the Oasys Import Task
  await completeOasysImportTask(page, oasysSections)

  // And I complete the the Risks and Needs Task
  await completeRisksAndNeedsTask(page, person.name)

  // And I complete the prison notes Task
  await completePrisonNotesTask(page)

  // And I complete the Location Factors Task
  await completeLocationFactorsTask(page)

  // And I complete the Access, Cultural and Healthcare Task
  await completeAccessCulturalAndHealthcareTask(page, person.name)

  // And I complete the Further Considerations Task
  await completeFurtherConsiderationsTask(page, person.name)

  // And I complete the Move On Task
  await completeMoveOnTask(page, person.name)

  // And I complete the Attach Required Documemts Task
  await completeAttachRequiredDocuments(page)

  // And I check my answers
  await checkApplyAnswers(page)

  // And I submit my application
  await submitApplication(page)

  // Then I should see a confirmation message
  await shouldSeeConfirmationPage(page)

  const url = page.url()

  return url.match(/applications\/(.+)\//)[1]
}
