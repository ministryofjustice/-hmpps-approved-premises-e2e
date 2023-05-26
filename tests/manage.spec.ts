import { test } from '@playwright/test'
import { visitDashboard } from '../steps/apply'
import { PremisesListPage } from '../pages/manage/premisesListPage'
import { PremisesPage } from '../pages/manage/premisesPage'
import { PlacementPage } from '../pages/manage/placementPage'
import { BedsPage } from '../pages/manage/bedsPage'
import { BedPage } from '../pages/manage/bedPage'
import { ConfirmationPage } from '../pages/manage/placementConfirmationPage'
import { CRNPage } from '../pages/apply'
import { CreatePlacementPage } from '../pages/manage/createPlacementPage'
import { MarkBedOutOfServicePage } from '../pages/manage/markBedOutOfServicePage'
import { CancellationPage } from '../pages/manage/cancellationPage'

const premisesName = 'Test AP 1'

const navigateToBedsPage = async page => {
  await navigateToPremisesPage(page)

  // Then I should see the premises view page
  const premisesPage = await PremisesPage.initialize(page, premisesName)

  // Given I am on an individual Premises' page
  // When I click the 'View Rooms' link
  await premisesPage.viewRooms()

  // Then I should see the rooms view page
  const bedsPage = await BedsPage.initialize(page, 'Manage beds')
  return bedsPage
}

const navigateToPremisesPage = async page => {
  // Given I visit the dashboard
  const dashboard = await visitDashboard(page)

  // When I click the Manage link
  await dashboard.clickManage()

  // Then I should see the a list of premises
  const listPage = await PremisesListPage.initialize(page, 'List of Approved Premises')

  // When I click on a Premises' 'View' link
  await listPage.choosePremises(premisesName)
}

const navigateToTodaysBooking = async page => {
  await navigateToPremisesPage(page)

  const premisesPage = await PremisesPage.initialize(page, premisesName)

  await premisesPage.clickManageTodaysArrival()
}

const manuallyBookBed = async page => {
  const bedsPage = await navigateToBedsPage(page)

  // Given I am on the rooms view page
  // When I click the 'Manage' link for a room
  await bedsPage.viewAvailableBed()

  // Then I should see the room view page
  const bedPage = await BedPage.initialize(page, 'Manage beds')

  // And be able to select a bed
  await bedPage.clickBookBed()

  // Given I am on the CRN entry page
  const crnPage = new CRNPage(page)
  // When I enter a CRN
  await crnPage.enterCrn()
  await crnPage.clickSearch()

  // Then I should see the placement page
  // Given I am on the placement page
  const createPlacementPage = new CreatePlacementPage(page)
  // When I complete the form
  await createPlacementPage.completeForm()
  createPlacementPage.clickSubmit()

  // Then I should be taken to the confirmation page
  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowSuccessMessage()
}

test('Manually book a bed', async ({ page }) => {
  const bedsPage = await navigateToBedsPage(page)

  // Given I am on the rooms view page
  // When I click the 'Manage' link for a room
  await bedsPage.viewAvailableBed()

  // Then I should see the room view page
  const bedPage = await BedPage.initialize(page, 'Manage beds')

  // And be able to select a bed
  await bedPage.clickBookBed()

  // Given I am on the CRN entry page
  const crnPage = new CRNPage(page)
  // When I enter a CRN
  await crnPage.enterCrn()
  await crnPage.clickSearch()

  // Then I should see the placement page
  // Given I am on the placement page
  const createPlacementPage = new CreatePlacementPage(page)
  // When I complete the form
  await createPlacementPage.completeForm()
  createPlacementPage.clickSubmit()

  // Then I should be taken to the confirmation page
  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowSuccessMessage()
})

test('Mark a booking as cancelled', async ({ page }) => {
  // Given there is a placement for today
  await manuallyBookBed(page)
  await navigateToTodaysBooking(page)
  // And I am on the placement's page
  const placementPage = await PlacementPage.initialize(page, 'Placement details')

  // When I click the 'Mark cancelled' link
  await placementPage.clickMarkCancelled()

  // Then I should see the cancellation form
  const cancellationFormPage = await CancellationPage.initialize(page, 'Cancel this placement')

  // When I complete the form
  await cancellationFormPage.completeForm()
  await cancellationFormPage.clickSubmit()

  // Then I should see the placement page with a banner
  await placementPage.showsCancellationLoggedMessage()
})

test('Mark a bed as lost', async ({ page }) => {
  // Given I am on the list of premises page
  const dashboard = await visitDashboard(page)
  await dashboard.clickManage()
  const listPage = await PremisesListPage.initialize(page, 'List of Approved Premises')

  // When I click on a Premises' 'View' link
  await listPage.choosePremises(premisesName)

  // Then I should see the premises view page
  const premisesPage = await PremisesPage.initialize(page, premisesName)

  // When I view a premises room
  await premisesPage.viewRooms()
  const bedsPage = await BedsPage.initialize(page, 'Manage beds')
  await bedsPage.viewAvailableBed()

  // Then I should be able to mark a bed as out of service
  const bedPage = await BedPage.initialize(page, 'Manage beds')
  await bedPage.clickMarkBedAsOutOfService()

  // When I fill in and submit the form
  const markBedOutOfServicePage = await MarkBedOutOfServicePage.initialize(page, 'Mark a bed as out of service')
  await markBedOutOfServicePage.completeForm()
  await markBedOutOfServicePage.clickSave()

  // Then I should be taken to the AP view page
  await premisesPage.showsLostBedLoggedMessage()
})
