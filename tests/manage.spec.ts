import { test } from '@playwright/test'
import { visitDashboard } from '../steps/apply'
import { PremisesListPage } from '../pages/manage/premisesListPage'
import { PremisesPage } from '../pages/manage/premisesPage'
import { BedsPage } from '../pages/manage/bedsPage'
import { BedPage } from '../pages/manage/bedPage'
import { ConfirmationPage } from '../pages/manage/placementConfirmationPage'
import { CRNPage } from '../pages/apply'
import { CreatePlacementPage } from '../pages/manage/createPlacementPage'

test('Manually book a bed', async ({ page }) => {
  const premisesName = 'Test AP 1'
  // Given I visit the dashboard
  const dashboard = await visitDashboard(page)

  // When I click the Manage link
  await dashboard.clickManage()

  // Then I should see the a list of premises
  const listPage = await PremisesListPage.initialize(page, 'List of Approved Premises')

  // When I click on a Premises' 'View' link
  await listPage.choosePremises(premisesName)

  // Then I should see the premises view page
  const premisesPage = await PremisesPage.initialize(page, premisesName)

  // Given I am on an individual Premises' page
  // When I click the 'View Rooms' link
  await premisesPage.viewRooms()

  // Then I should see the rooms view page
  const bedsPage = await BedsPage.initialize(page, 'Manage beds')

  // Given I am on the rooms view page
  // When I click the 'Manage' link for a room
  await bedsPage.viewBed()

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
