import { test } from '@playwright/test'
import {
  checkApplyAnswers,
  completeAccessCulturalAndHealthcareTask,
  completeAttachRequiredDocuments,
  completeBasicInformationTask,
  completeFurtherConsiderationsTask,
  completeLocationFactorsTask,
  completeMoveOnTask,
  completeOasysImportTask,
  completePrisonNotesTask,
  completeRisksAndNeedsTask,
  completeTypeOfApTask,
  enterAndConfirmCrn,
  shouldSeeConfirmationPage,
  startAnApplication,
  submitApplication,
  visitDashboard,
} from '../steps/apply'
import { assignAssessmentToMe } from '../steps/workflow'
import {
  addMatchingInformation,
  assessSuitability,
  checkAssessAnswers,
  confirmInformation,
  makeDecision,
  provideRequirements,
  reviewApplication,
  shouldSeeAssessmentConfirmationScreen,
  startAssessment,
  submitAssessment,
} from '../steps/assess'

test('Apply for an Approved Premises', async ({ page }) => {
  // Given I visit the Dashboard
  const dashboard = await visitDashboard(page)

  // And I start an application
  await startAnApplication(dashboard, page)

  // And I enter and confirm a CRN
  await enterAndConfirmCrn(page)

  // And I complete the basic information Task
  await completeBasicInformationTask(page)

  // And I complete the Type of AP Task
  await completeTypeOfApTask(page)

  // And I complete the Oasys Import Task
  await completeOasysImportTask(page)

  // And I complete the the Risks and Needs Task
  await completeRisksAndNeedsTask(page)

  // And I complete the prison notes Task
  await completePrisonNotesTask(page)

  // And I complete the Location Factors Task
  await completeLocationFactorsTask(page)

  // And I complete the Access, Cultural and Healthcare Task
  await completeAccessCulturalAndHealthcareTask(page)

  // And I complete the Further Considerations Task
  await completeFurtherConsiderationsTask(page)

  // And I complete the Move On Task
  await completeMoveOnTask(page)

  // And I complete the Attach Required Documemts Task
  await completeAttachRequiredDocuments(page)

  // And I check my answers
  await checkApplyAnswers(page)

  // And I submit my application
  await submitApplication(page)

  // Then I should see a confirmation message
  await shouldSeeConfirmationPage(page)
})

test('Assess an Approved Premises Application', async ({ page }) => {
  // Given I visit the Dashboard
  const dashboard = await visitDashboard(page)

  // And I allocate the assessement to myself
  await assignAssessmentToMe(dashboard, page)

  // And I start the assessment
  await startAssessment(page)

  // And I Review the application
  await reviewApplication(page)

  // And I confirm there is enough information in the Assessment
  await confirmInformation(page)

  // And I assess the suitablity of the Application
  await assessSuitability(page)

  // And I provide the requirements to support the placement
  await provideRequirements(page)

  // And I make a decision
  await makeDecision(page)

  // And I provide matching information
  await addMatchingInformation(page)

  // And I check my answers
  await checkAssessAnswers(page)

  // And I submit my Assessment
  await submitAssessment(page)

  // Then I should see a confirmation screen
  await shouldSeeAssessmentConfirmationScreen(page)
})
