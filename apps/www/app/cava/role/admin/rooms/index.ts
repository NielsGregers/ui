"use server"
import {} from "./schema"

/**
 * Creates a room with the given display name and capacity
 * @param displayName 
 * @param capacity 
 * @returns The email address of the newly created room
 */
export async function provisionRoom(displayName:string,capacity:number):Promise<string>{
    const powershell = `
$name = "${displayName}"
$alias = $name.Split("(")[0].Trim().Replace(" ", "-").ToLower()
$prefix=""
$mailbox = New-Mailbox -Name $prefix & "room-$alias" -DisplayName "$name" -Room -ResourceCapacity  ${capacity}
$result = $mailbox.WindowsEmailAddress
`


    throw new Error("Not implemented")
    return ""
}


/**
 * Deletes a room
 * @param email 
 * @returns 
 */
export async function deleteRoom(email:string){
    throw new Error("Not implemented")
    return ""
}

/**
 * Set restrictions on who can book a room
 * 
 * if you pass an empty array, the room restriction will be removed
 * @param emails 
 * @returns 
 */
export async function setRestrictedTo(emails:string[]){
    throw new Error("Not implemented")
    return ""
}