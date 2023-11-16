"use server"
export namespace AppointmentRequest {
  export interface Root {
    subject: string
    start: Start
    end: End
    isAllDay: boolean
  }

  export interface Start {
    dateTime: string
    timeZone: string
  }

  export interface End {
    dateTime: string
    timeZone: string
  }
}
export namespace AppointmentResponse {
  export interface Root {
    "@odata.context": string
    "@odata.etag": string
    id: string
    createdDateTime: string
    lastModifiedDateTime: string
    changeKey: string
    categories: any[]
    transactionId: any
    originalStartTimeZone: string
    originalEndTimeZone: string
    iCalUId: string
    reminderMinutesBeforeStart: number
    isReminderOn: boolean
    hasAttachments: boolean
    subject: string
    bodyPreview: string
    importance: string
    sensitivity: string
    isAllDay: boolean
    isCancelled: boolean
    isOrganizer: boolean
    responseRequested: boolean
    seriesMasterId: any
    showAs: string
    type: string
    webLink: string
    onlineMeetingUrl: any
    isOnlineMeeting: boolean
    onlineMeetingProvider: string
    allowNewTimeProposals: boolean
    occurrenceId: any
    isDraft: boolean
    hideAttendees: boolean
    responseStatus: ResponseStatus
    body: Body
    start: Start
    end: End
    location: Location
    locations: any[]
    recurrence: any
    attendees: any[]
    organizer: Organizer
    onlineMeeting: any
  }

  export interface ResponseStatus {
    response: string
    time: string
  }

  export interface Body {
    contentType: string
    content: string
  }

  export interface Start {
    dateTime: string
    timeZone: string
  }

  export interface End {
    dateTime: string
    timeZone: string
  }

  export interface Location {
    displayName: string
    locationType: string
    uniqueIdType: string
    address: Address
    coordinates: Coordinates
  }

  export interface Address {}

  export interface Coordinates {}

  export interface Organizer {
    emailAddress: EmailAddress
  }

  export interface EmailAddress {
    name: string
    address: string
  }
}

export async function createAppointment(
  booking: AppointmentRequest.Root,
  token: string
): Promise<AppointmentResponse.Root> {
  const response = await fetch("https://graph.microsoft.com/v1.0/me/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(booking),
  })
  if (response.status === 201) {
    return await response.json()
  } else {
    throw new Error(await response.text())
  }
}
