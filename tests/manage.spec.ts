import { test } from '../test'
import { visitDashboard } from '../steps/apply'
import { PremisesListPage } from '../pages/manage/premisesListPage'
import { PremisesPage } from '../pages/manage/premisesPage'
import { PlacementPage } from '../pages/manage/placementPage'
import { BedsPage } from '../pages/manage/bedsPage'
import { BedPage } from '../pages/manage/bedPage'
import { ConfirmationPage } from '../pages/manage/confirmationPage'
import { CRNPage } from '../pages/apply'
import { CreatePlacementPage } from '../pages/manage/createPlacementPage'
import { MarkBedOutOfServicePage } from '../pages/manage/markBedOutOfServicePage'
import { CancellationPage } from '../pages/manage/cancellationPage'
import { NonarrivalFormPage } from '../pages/manage/nonarrivalFormPage'
import { ArrivalFormPage } from '../pages/manage/arrivalFormPage'
import { ChangePlacementDatesPage } from '../pages/manage/changePlacementDates'
import { MoveBedPage } from '../pages/manage/moveBedPage'
import { ChangeDepartureDatePage } from '../pages/manage/changeDepartureDate'

const premisesName = 'Test AP 10'

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

const navigateToCurrentResident = async page => {
  await navigateToPremisesPage(page)

  const premisesPage = await PremisesPage.initialize(page, premisesName)

  await premisesPage.clickManageCurrentResident()
}

const manuallyBookBed = async ({ page, person }) => {
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
  await crnPage.enterCrn(person.crn)
  await crnPage.clickSearch()

  // Then I should see the placement page
  // Given I am on the placement page
  const createPlacementPage = new CreatePlacementPage(page)
  // When I complete the form
  await createPlacementPage.completeForm()
  createPlacementPage.clickSubmit()

  // Then I should be taken to the confirmation page
  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowPlacementSuccessMessage()
}

test('Manually book a bed', async ({ page, person, indexOffenceRequired }) => {
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
  await crnPage.enterCrn(person.crn)
  await crnPage.clickSearch()

  // Then I should see the placement page
  // Given I am on the placement page
  const createPlacementPage = new CreatePlacementPage(page)
  // When I complete the form
  await createPlacementPage.completeForm(indexOffenceRequired)
  createPlacementPage.clickSubmit()

  // Then I should be taken to the confirmation page
  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowPlacementSuccessMessage()
})

test('Mark a booking as cancelled', async ({ page }) => {
  // Given there is a placement for today
  // await manuallyBookBed(page)
  await navigateToTodaysBooking(page)
  // And I am on the placement's page
  const placementPage = await PlacementPage.initialize(page, 'Placement details')

  // When I click the 'Mark cancelled' link
  await placementPage.clickMarkCancelled()

  // Then I should see the cancellation form
  const cancellationFormPage = await CancellationPage.initialize(page, 'Confirm cancelled placement')

  // When I complete the form
  await cancellationFormPage.completeForm()
  await cancellationFormPage.clickSubmit()

  // Then I should see the placement page with a banner
  await placementPage.showsCancellationLoggedMessage()
})

test('Change placement dates', async ({ page, person }) => {
  // Given there is a placement for today
  await manuallyBookBed({ page, person })
  await navigateToTodaysBooking(page)
  // And I am on the placement's page
  const placementPage = await PlacementPage.initialize(page, 'Placement details')

  // When I click the 'Extend' link
  await placementPage.clickChangePlacementDates()

  // Then I should see the extension form
  const extensionFormPage = await ChangePlacementDatesPage.initialize(page, 'Update placement date')

  // When I complete the form
  await extensionFormPage.completeForm()
  await extensionFormPage.clickSubmit()

  // Then I should see the placement page with a banner
  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowBookingChangeSuccessMessage()
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

test('Mark a booking as arrived and extend it', async ({ page, person }) => {
  // Given there is a placement for today
  // And I am on the premises's page
  await manuallyBookBed({ page, person })
  await navigateToTodaysBooking(page)

  const placementPage = await PlacementPage.initialize(page, 'Placement details')

  // Given I click 'Mark arrived'
  await placementPage.clickMarkArrived()

  // When I complete the form
  const arrivalFormpage = await ArrivalFormPage.initialize(page, 'Mark the person as arrived')
  await arrivalFormpage.completeForm()

  // Then I should see the placement page with a banner confirming the arrival was logged
  const premisesPage = await PremisesPage.initialize(page, premisesName)
  await premisesPage.showsArrivalLoggedMessage()

  // When I click the 'Change departure date' link
  await navigateToCurrentResident(page)
  await placementPage.clickChangeDepartureDate()

  const changeDepartureDatesPage = await ChangeDepartureDatePage.initialize(page, 'Update departure date')
  await changeDepartureDatesPage.completeForm()
  await changeDepartureDatesPage.clickSubmit()

  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowDepartureDateChangedMessage()
})

test('Mark a booking as not arrived', async ({ page, person }) => {
  // Given there is a placement for today
  // And I am on the premises's page
  await manuallyBookBed({ page, person })
  await navigateToPremisesPage(page)
  const premisesPage = await PremisesPage.initialize(page, premisesName)

  // When I click the 'Manage today's arrivals' link
  await premisesPage.clickManageTodaysArrival()

  // Then I am taken to the placement page
  const placementPage = await PlacementPage.initialize(page, 'Placement details')

  // Given I click 'Mark not arrived'
  await placementPage.clickMarkNotArrived()

  // When I complete the form
  const nonArrivalFormPage = await NonarrivalFormPage.initialize(page, 'Record a non-arrival')
  await nonArrivalFormPage.completeForm()

  // Then I should see the placement page with a banner confirming the non-arrival was logged
  await placementPage.showsNonArrivalLoggedMessage()
})

test('Move a booking', async ({ page, person }) => {
  // Given there is a placement for today
  // And I am on the premises's page
  await manuallyBookBed({ page, person })
  await navigateToPremisesPage(page)
  const premisesPage = await PremisesPage.initialize(page, premisesName)

  // When I click the 'Manage today's arrivals' link
  await premisesPage.clickManageTodaysArrival()

  // Then I am taken to the placement page
  const placementPage = await PlacementPage.initialize(page, 'Placement details')

  // Given I click 'Move person to a new bed'
  await placementPage.clickMovePersonToANewBed()

  // When I complete the form
  const moveBedPage = await MoveBedPage.initialize(page, 'Move person to a new bed')
  await moveBedPage.completeForm()

  // Then I should see the placement page with a banner confirming the bed move was logged
  await placementPage.showsBedMoveLoggedMessage()
})
