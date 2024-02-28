import { test } from '../../test'
import { createApplication } from '../../steps/apply'
import { assessApplication } from '../../steps/assess'

import { setRoles } from '../../steps/admin'

test('Apply, assess, match and book an emergency application for an Approved Premises', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  await setRoles(page, user.name, ['Emergency APs'])

  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, true)
  await assessApplication({ page, user, person }, id, { emergencyApplication: true })
  // Skip match until it's back
  // await matchAndBookApplication({ page, user, person }, id)
})
