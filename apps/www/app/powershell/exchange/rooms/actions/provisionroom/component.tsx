"use client"

import { useState } from "react"
import { action } from "."
import { Button } from "@/registry/new-york/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/registry/new-york/ui/dialog"

import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
export function ProvisionRoomAction(params: { sharepointId: number, onDone: () => void }) {
    const [processing, setprocessing] = useState(false)
    const [done, setdone] = useState(false)
    const [error, seterror] = useState("")
    const [result, setresult] = useState("")
    const callAction = async () => {
        setprocessing(true)
        
        const r  = await action(params.sharepointId)
        
        setdone(true)
        //const r : {hasError:boolean,error:string,data:string} = {hasError:true,error:"dfsd",data:"fdsfdsf"}
        if (r.hasError) {
            seterror(r.error)
            return
        }

        setresult(r.data.email)
    }





    return (
        <Dialog open={true} onOpenChange={(open)=>{if (!open) params.onDone()}}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Provision</DialogTitle>
                    <DialogDescription>
                        Provisioning a room by calling the PowerShell script
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {processing && !done && <div className="text-blue-500">Processing...</div>}
                    {error && <div className="text-red-500">
                        <h2>Error processing</h2>
                        {JSON.stringify(error)}
                        </div>}
                    {result && <div className="text-green-500"><h2>Done processing</h2><pre>{JSON.stringify(result)}</pre></div>}
                </div>
                <DialogFooter>
                    <Button disabled={processing} onClick={() => callAction()}>Run</Button>
                    <Button onClick={() => params.onDone()}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

