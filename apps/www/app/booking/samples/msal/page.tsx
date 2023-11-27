"use client"
import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "../../../../components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"
import { Popover } from "@/registry/new-york/ui/popover"
import { ColumnDef } from "@tanstack/react-table"
import React, { useContext, useEffect, useState } from "react"
import { useMsal, useAccount } from "@azure/msal-react";
import { https } from "@/lib/httphelper"
import { BookingContext } from "../../context"
 interface CaseProps {
  scopes:string[],
  title:string,
  testurl:string,
  token?:string
}


const cases : CaseProps[]=[
    {scopes:["User.Read"],
    title:"Read user profile",
"testurl":"https://graph.microsoft.com/v1.0/me"},
{scopes:["Mail.ReadBasic"],
    title:"Read mails",
"testurl":"https://graph.microsoft.com/v1.0/me/messages"},
{scopes:["User.Read","Group.Read.All"],
    title:"Get memberships",
"testurl":"https://graph.microsoft.com/v1.0/me/memberOf?$count=true"}
]





    

export default function Admin(){
  const {setRoles,roles} = useContext(BookingContext)
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
const [latestResponse, setlatestResponse] = useState<any>()
useEffect(() => {
 if (account){
  
  setRoles( account.idTokenClaims?.roles ?? [])
 }
}, [account, setRoles])


const [latestError, setlatestError] = useState<any>()
    const aquireToken = async (thisCase?:CaseProps) => {
        setlatestError(undefined)
        setlatestResponse(undefined)
        if (account && thisCase) {
            try {
                const response = await instance.acquireTokenSilent({
                    scopes: thisCase?.scopes ?? [],
                    account: account,
                  });
                  thisCase.token = response.accessToken
                  const getResponse = await https(response.accessToken,"GET", thisCase.testurl)
                  setlatestResponse(getResponse)

            } catch (error) {
                try {
                    const response = await instance.acquireTokenPopup({
                        scopes: thisCase?.scopes ?? [],
                        account: account,
                      });
                      thisCase.token = response.accessToken
                      const getResponse = await https(response.accessToken,"GET", thisCase.testurl)
                      setlatestResponse(getResponse)
                      
                } catch (error) {
                    setlatestError(error)
                }

               
                  
            }
    
        

        
            }
        }

    const col: ColumnDef<GenericItem> = {
        id: "string1",
        accessorKey: "string1",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: ({ row }) => <div><Button disabled={accounts.length<1}  onClick={()=>{aquireToken(row.original.refObject1)}}>Aquire</Button></div>,
        enableSorting: true,
        enableHiding: true,
      }
     
    return (
    
    <div>


      
{roles.join(",")}
    
    <GenericTable data={cases.map(c=>{return {title:c.scopes.join(","),
    
    refObject1:c,
    details:c.testurl,}})}
    
    caption="MSAL Access Token Test"
    description="List of token scopes"
    addtionalColumns={[col]}
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