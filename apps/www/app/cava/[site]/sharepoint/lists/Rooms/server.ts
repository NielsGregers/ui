"use server"

import { ItemType, dependencies, listName, listURL, map, schema } from "."

export async function UpdateWhoCanBook(room: ItemType) {
  const restrictedTo = room.RestrictedTo.split(",")
  const members = restrictedTo.map((m) => `"${m}"`).join(",")
  const powershell =
    restrictedTo.length > 0
      ? `

$mail = "${room.Email}"
$restrictedTo =  ${members}
write-host "Processing" $mail

Set-Mailbox $mail  -MailTip "This room has restrictions on who can book it"
Set-CalendarProcessing $mail  -DeleteComments $false -AutomateProcessing AutoAccept -AllRequestInPolicy $false  -AllBookInPolicy $false -BookInPolicy $restrictedTo -BookingWindowInDays 601 -ResourceDelegates $null 
`
      : `

$mail = "${room.Email}"
Set-Mailbox $mail  -MailTip ""
Set-CalendarProcessing $mail  -DeleteComments $false -AutomateProcessing AutoAccept  -AllBookInPolicy:$true -BookInPolicy $null -BookingWindowInDays 601        
`
return powershell

}
