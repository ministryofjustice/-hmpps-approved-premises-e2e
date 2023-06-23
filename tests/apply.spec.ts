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
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true)
  await assessApplication({ page, user, person }, id)
  await matchAndBookApplication({ page, user, person }, id)
})

test('Apply, assess, match and book an application for an Approved Premises without a release date', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, false)
  await assessApplication({ page, user, person }, id)
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
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true)
  await requestAndAddAdditionalInformation({ page, user, person }, id)
})
