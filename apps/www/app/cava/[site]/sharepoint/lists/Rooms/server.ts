"use server"

import { invokeExchangePowerShell } from "@/app/cava/server"

import { ItemType } from "."

export async function powershellUpdateWhoCanBook(room: ItemType) {
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
$result = $true
`
      : `

$mail = "${room.Email}"
Set-Mailbox $mail  -MailTip ""
Set-CalendarProcessing $mail  -DeleteComments $false -AutomateProcessing AutoAccept  -AllBookInPolicy:$true -BookInPolicy $null -BookingWindowInDays 601        
$result = $true
`
  return powershell
}

export async function UpdateWhocanBook(room: ItemType) {
  
  const script = await powershellUpdateWhoCanBook(room)
  const result = await invokeExchangePowerShell<boolean>(script)
  return { script, result }
}
