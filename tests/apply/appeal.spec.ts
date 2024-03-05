import { test } from '../../test'

import { setRoles } from '../../steps/admin'
import { createApplication, recordAnAppealOnApplication } from '../../steps/apply'
import { assessApplication } from '../../steps/assess'
import { verifyEmailSent } from '../../steps/email'

test('Record a successful appeal against a rejected application', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  await setRoles(page, user.name, [])
  const id = await createApplication(
    { page, person, indexOffenceRequired, oasysSections, applicationType: 'standard' },
    false,
    true,
  )
  await assessApplication({ page, user, person }, id, { acceptApplication: false })
  await recordAnAppealOnApplication(page, id, 'Appeal successful')
  await verifyEmailSent('Approved Premises assessment successfully appealed', user.email)
})

test('Record an unsuccessful appeal against a rejected application', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  await setRoles(page, user.name, [])
  const id = await createApplication(
    { page, person, indexOffenceRequired, oasysSections, applicationType: 'standard' },
    false,
    true,
  )
  await assessApplication({ page, user, person }, id, { acceptApplication: false })
  await recordAnAppealOnApplication(page, id, 'Appeal unsuccessful')
  await verifyEmailSent('Approved Premises assessment appeal unsuccessful', user.email)
})
