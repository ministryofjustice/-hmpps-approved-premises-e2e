import { Page } from '@playwright/test'
import { EditUser, Qualification } from '../pages/admin/editUser'
import { visitDashboard } from './apply'
import { UserList } from '../pages/admin/listUsers'
import { TestOptions } from '../testOptions'

export const setRoles = async (
  page: Page,
  username: TestOptions['user']['name'],
  roles: ReadonlyArray<Qualification>,
) => {
  const dashboard = await visitDashboard(page)
  dashboard.clickUserMangement()

  const userListPage = await UserList.initialize(page)

  await userListPage.search(username)

  await userListPage.clickEditUser(username)

  const usersPage = new EditUser(page)

  await usersPage.uncheckSelectedQualifications()

  await usersPage.checkCheckBoxes(roles)

  await usersPage.clickSave()
}
