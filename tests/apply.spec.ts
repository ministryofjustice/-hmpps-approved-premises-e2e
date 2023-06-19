import { test } from '../test'
import { createApplication } from '../steps/apply'
import { assessApplication } from '../steps/assess'
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

})
