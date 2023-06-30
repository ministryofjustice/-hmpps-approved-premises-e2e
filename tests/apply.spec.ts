import { test } from '../test'
import { createApplication } from '../steps/apply'
import { assessApplication, requestAndAddAdditionalInformation } from '../steps/assess'
import { matchAndBookApplication } from '../steps/match'

import { reviewAndApprovePlacementApplication, startAndCreatePlacementApplication } from '../steps/placementApplication'

test('Apply, assess, match and book an application for an Approved Premises with a release date', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, false)
  await assessApplication({ page, user, person }, id, false)
  await matchAndBookApplication({ page, user, person }, id)
})

test('Apply, assess, match and book a short notice application for an Approved Premises', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, true)
  await assessApplication({ page, user, person }, id, true)
  await matchAndBookApplication({ page, user, person }, id)
})

test('Apply, assess, match and book an application for an Approved Premises without a release date', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, false, false)
  await assessApplication({ page, user, person }, id, false)
  await startAndCreatePlacementApplication({ page }, id)
  await reviewAndApprovePlacementApplication({ page, user }, id)
  // TODO: Match and book once approval is done
})

test('Request further information on an Application, adds it and proceeds with the assessment', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, false)
  await requestAndAddAdditionalInformation({ page, user, person }, id)
})
