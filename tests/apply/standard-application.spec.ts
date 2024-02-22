import { test } from '../../test'
import { createApplication, withdrawAnApplicationAfterSubmission } from '../../steps/apply'
import { assessApplication } from '../../steps/assess'

import { setRoles } from '../../steps/admin'

test('Apply, assess, match and book an application for an Approved Premises with a release date', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  await setRoles(page, [])
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, false, true)
  await assessApplication({ page, user, person }, id)
  await withdrawAnApplicationAfterSubmission(page, id)
  // Skip match until it's back
  // await matchAndBookApplication({ page, user, person }, id)
})
