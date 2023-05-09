import { Page } from '@playwright/test'
import { AssessPage, ConfirmationPage, ListPage, TasklistPage } from '../pages/assess'
import { visitDashboard } from './apply'

export const startAssessment = async (page: Page) => {
  const dashboard = await visitDashboard(page)
  await dashboard.clickAssess()

  const listPage = new ListPage(page)
  await listPage.clickFirstAssessment()
}

export const reviewApplication = async (page: Page) => {
  const tasklistPage = new TasklistPage(page)
  await tasklistPage.clickTask('Review application and documents')

  const reviewPage = await AssessPage.initialize(page, 'Review application')
  await reviewPage.checkRadio('Yes')
  await reviewPage.clickSubmit()
}

export const confirmInformation = async (page: Page) => {
  const tasklistPage = new TasklistPage(page)
  await tasklistPage.clickTask('Check there is sufficient information to make a decision')

  const confirmPage = await AssessPage.initialize(page, 'Sufficient information')
  await confirmPage.checkRadio('Yes')
  await confirmPage.clickSubmit()
}

export const assessSuitability = async (page: Page) => {
  const tasklistPage = new TasklistPage(page)
  await tasklistPage.clickTask('Assess suitability of application')

  const assessPage = await AssessPage.initialize(page, 'Suitability assessment')
  await assessPage.checkRadioInGroup(
    'Does the application identify the risk factors that an Approved Premises (AP) placement can support?',
    'Yes',
  )
  await assessPage.checkRadioInGroup(
    'Does the application explain how an AP placement would be beneficial for risk management?',
    'Yes',
  )
  await assessPage.checkRadioInGroup('Are there factors to consider regarding the location of placement?', 'Yes')
  await assessPage.checkRadioInGroup('Is the move on plan sufficient?', 'Yes')
  await assessPage.clickSubmit()
}

export const provideRequirements = async (page: Page) => {
  const tasklistPage = new TasklistPage(page)
  await tasklistPage.clickTask('Provide any requirements to support placement')

  const requirementsPage = await AssessPage.initialize(page, 'Required actions to support a placement')
  await requirementsPage.checkRadioInGroup(
    'Are there any additional actions required by the probation practitioner to make a placement viable?',
    'No',
  )
  await requirementsPage.checkRadioInGroup('Are any additional curfews or sign ins recommended?', 'No')
  await requirementsPage.checkRadioInGroup(
    'Are there concerns that the person poses a potentially unmanageable risk to staff or others?',
    'No',
  )
  await requirementsPage.checkRadioInGroup(
    'Are there any additional recommendations for the receiving AP manager?',
    'No',
  )
  await requirementsPage.clickSubmit()
}

export const makeDecision = async (page: Page) => {
  const tasklistPage = new TasklistPage(page)
  await tasklistPage.clickTask('Make a decision')

  const decisionPage = await AssessPage.initialize(page, 'Make a decision')
  await decisionPage.checkRadio('Release date has been provided, proceed to matching')
  await decisionPage.clickSubmit()
}

export const addMatchingInformation = async (page: Page) => {
  const tasklistPage = new TasklistPage(page)
  await tasklistPage.clickTask('Matching information')

  const matchingInformationPage = await AssessPage.initialize(page, 'Matching information')

  await matchingInformationPage.checkRadio('Standard AP')

  await matchingInformationPage.checkRequirement('Wheelchair accessible', 'essential')
  await matchingInformationPage.checkRequirement('Single room', 'notRelevant')
  await matchingInformationPage.checkRequirement('Adapted for hearing impairments', 'notRelevant')
  await matchingInformationPage.checkRequirement('Adapted for visual impairments', 'notRelevant')
  await matchingInformationPage.checkRequirement('Adapted for restricted mobility', 'essential')
  await matchingInformationPage.checkRequirement('Catering required', 'notRelevant')

  await matchingInformationPage.checkRequirement('Contact sexual offences against an adult adults', 'notRelevant')
  await matchingInformationPage.checkRequirement('Non contact sexual offences against an adult adults', 'notRelevant')
  await matchingInformationPage.checkRequirement('Contact sexual offences against children', 'notRelevant')
  await matchingInformationPage.checkRequirement('Non contact sexual offences against children', 'notRelevant')
  await matchingInformationPage.checkRequirement('Non sexual offences against children', 'notRelevant')
  await matchingInformationPage.checkRequirement('Arson offences', 'relevant')
  await matchingInformationPage.checkRequirement('Hate based offences', 'relevant')
  await matchingInformationPage.checkRequirement('Vulnerable to exploitation', 'notRelevant')

  await matchingInformationPage.clickSubmit()
}

export const checkAssessAnswers = async (page: Page) => {
  const tasklistPage = new TasklistPage(page)
  await tasklistPage.clickTask('Check assessment answers')

  const checkYourAnswersPage = await AssessPage.initialize(page, 'Check your answers')
  await checkYourAnswersPage.clickContinue()
}

export const submitAssessment = async (page: Page) => {
  const tasklistPage = new TasklistPage(page)
  await tasklistPage.submitAssessment()
}

export const shouldSeeAssessmentConfirmationScreen = async (page: Page) => {
  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowSuccessMessage()
}
