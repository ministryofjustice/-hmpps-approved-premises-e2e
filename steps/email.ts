import { isAfter, parseISO, subMinutes } from 'date-fns'
import { NotifyClient } from 'notifications-node-client'
import { expect } from '@playwright/test'

import { TestOptions } from '../testOptions'

export const verifyEmailSent = async (subject: string, emailAddress: TestOptions['user']['email']) => {
  await expect(async () => {
    const client = new NotifyClient(process.env.NOTIFY_API_KEY)
    const response = await client.getNotifications('email')
    const { notifications } = response.data
    const matchedNotification = notifications.find(
      notification =>
        notificationWasSentInTheLastMinute(notification) &&
        notification.subject === subject &&
        notification.email_address === emailAddress,
    )
    expect(matchedNotification).toBeTruthy()
  }).toPass()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notificationWasSentInTheLastMinute = (notification: any) =>
  isAfter(parseISO(notification.sent_at), subMinutes(Date.now(), 1))
