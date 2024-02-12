import { Page } from '@playwright/test'
import { EditUser, Qualification } from '../pages/admin/editUser'
import { visitDashboard } from './apply'
import { UserList } from '../pages/admin/listUsers'

export const setRoles = async (page: Page, user: { name: string }, roles: ReadonlyArray<Qualification>) => {
  const dashboard = await visitDashboard(page)
  dashboard.clickUserMangement()

  const userListPage = await UserList.initialize(page)

  await userListPage.search(user.name)

  await userListPage.clickEditUser(user.name)

  const usersPage = new EditUser(page)

  await usersPage.uncheckSelectedQualifications()

  await usersPage.checkCheckBoxes(roles)

  await usersPage.clickSave()
}
