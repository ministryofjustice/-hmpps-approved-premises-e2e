export type TestOptions = {
  person: {
    crn: string
    name: string
  }
  user: {
    name: string
    username: string
    password: string
    email?: string
  }
  oasysSections: Array<string>
  emergencyApplicationUser?: string
}
