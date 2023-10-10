"use client"
import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"
import { Popover } from "@/registry/new-york/ui/popover"
import { ColumnDef } from "@tanstack/react-table"
import React, { useState } from "react"
import { useMsal, useAccount } from "@azure/msal-react";
import { https, httpsGetAll } from "@/lib/httphelper"
import { ReleaseFields } from "./sharepoint"

export default function Admin(){
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
const [latestResponse, setlatestResponse] = useState<any>()

const [latestError, setlatestError] = useState<any>()
    const aquireToken = async () => {
        setlatestError(undefined)
        setlatestResponse(undefined)
        if (account ) {
            try {
                const response = await instance.acquireTokenSilent({
                    scopes: ["Sites.Read.All"],
                    account: account,
                  });
          
                  const getResponse = await httpsGetAll<ReleaseFields>(response.accessToken, "https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/nexiintra-hub:/lists/Releases/items?$expand=fields")
                  setlatestResponse(getResponse)

            } catch (error) {
                try {
                    const response = await instance.acquireTokenPopup({
                        scopes: ["Sites.Read.All"],
                        account: account,
                      });
                      const token =  response.accessToken
                      const getResponse = await httpsGetAll<ReleaseFields>(response.accessToken, "https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/nexiintra-hub:/lists/Releases/items?$expand=fields")
                      setlatestResponse(getResponse)
                      
                } catch (error) {
                    setlatestError(error)
                }

               
                  
            }
    
        

        
            }
        }


     
    return (
    
    <div>


<div><Button disabled={accounts.length<1}  onClick={()=>{aquireToken()}}>Aquire</Button></div>
     
    
    <GenericTable data={[]}
    
    caption="MSAL Access Token Test"
    description="List of token scopes"
   
    actions={{
        filterComponent: (params) => {
          if (params) {
            let x = 1
          }
          return (
            <div className="flex w-max space-x-4">
              <Button disabled={accounts.length>0}  onClick={()=>{instance.loginRedirect()}}>Login</Button>
              <Button disabled={accounts.length<1}variant={"destructive"}  onClick={()=>{instance.logout()}}>Logout</Button>
                <div className="grow">&nbsp;</div>
                <Button variant={"secondary"} onClick={()=>{setlatestResponse(undefined)}}>Clear</Button>
            </div>
            
          )
        },
        selectedItemsActionsComponent: (params) => {
          return (
            <div>
              {/* <Button variant="destructive"> Delete</Button> */}
              {/* {params.rows.length === 1 &&
                params.rows[0].original.string1 === "New" && (
                  <AcceptOrder
                    order={
                      cava.orders.find(
                        (o) => o.id === params.rows[0].original.id
                      ) ?? null
                    }
                    onAcceptOrder={function (order: Order): void {
                   
                       createWorkOrderItems(
                         magicbox.session?.accessToken ?? "",
                         order
                       )
                       params.rows[0].original.string1 = "Pending"
                       toast({
                          title: "Work Orders created",
                          
                         variant: "default"
                       })

                    }}
                  />
                )} */}
              {params.rows.length > 1 && (
                <Button
                  onClick={() => {
                    const items = params.rows.map((r) => {
                      return r.original
                    })
                    debugger
                  }}
                >
                  Actions
                </Button>
              )}
            </div>
          )
        },
      }}/>
<div className="flex">
    <div >
        <h3>Latest response</h3>
        <pre>{JSON.stringify(latestResponse,null,2)}</pre>  </div>
    <div>
    <h3>Latest error</h3>
        <pre>{JSON.stringify(latestError,null,2)}</pre> </div>
</div>
          
      </div>

    )


}