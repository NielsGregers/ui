"use client"
import React, { useContext, useMemo, useState } from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import { KoksmatContext } from '@/app/koksmat/context';
import { MessageType } from '../../../server/MessageType';
import { Button } from '@/registry/new-york/ui/button';
import Link from 'next/link';
import { PageContextSectionHeader } from '../../../components/page-section-header';
import ListAzAccounts from '../../../azure/az-accounts';



export default function Connections() {
  const [siginUrl, setsiginUrl] = useState("https://microsoft.com/devicelogin")
  const [signinCode, setsigninCode] = useState("")
  const [accessChecked, setaccessChecked] = useState(false)
  const [hasAzAccess, sethasAzAccess] = useState(false)
  const [createPnpApp, setcreatePnpApp] = useState(false)
  const koksmat = useContext(KoksmatContext);

  const onMessage = (msg: MessageType) => {
    if (msg.isError) return

    if (msg.message.includes("enter the code")) {

      const code = msg.message.split("enter the code ")[1].split(" to authenticate")[0] ?? ""
      setsigninCode(code)
    }

    console.log(msg);
  }
  const onAzMessage = (msg: MessageType) => {
 

    if (msg.message.includes("enter the code")) {

      const code = msg.message.split("enter the code ")[1].split(" to authenticate")[0] ?? ""
      setsigninCode(code)
    }

    console.log(msg);
  }
  const path = "/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/koksmat/[tenant]/[site]/kitchen/[workspace]/connect/"
  return (<div>

    {koksmat.kitchenSpace && <div>
      <PageContextSectionHeader title={'Checking Connections'} />
 <ListAzAccounts/>
{accessChecked && !hasAzAccess &&
// Try to login
      <RunServerProcess caption="Login to AZ" onMessage={onAzMessage}  cmd={'az'} args={["login","--use-device-code","--allow-no-subscriptions"]} timeout={120} channelname={'az'} cwd={koksmat.kitchenSpace.cwd} />
}
      <Button className="mb-3" disabled={createPnpApp} onClick={() => { setcreatePnpApp(true) }}>Register Application in Microsoft Entra ID</Button>
      {signinCode &&
        <div>
       
          {/* <div className="mb-3">
            Copy this, you will be asked to enter that code in the browser when you click the link below
          </div> */}
          <div>
            <textarea>{signinCode}</textarea>
          </div>
      
          <div>
           
            <Button variant="default"><Link href={siginUrl} target="_blank">Copy the code above, then click here</Link>
            </Button>
          </div>
        </div>
      }
      {createPnpApp &&
        <RunServerProcess caption="Creating PNP application" onMessage={onMessage} cmd={'pwsh'} args={["-file", `/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/koksmat/[tenant]/[site]/kitchen/[kitchen]/connect/connect-pnp.ps1`, "-tenantname",koksmat.tenant, "-applicationname",`koksmat-${koksmat.site}`]} timeout={3600} channelname={'git'} cwd={koksmat.kitchenSpace.cwd} />
      }
    </div>}

  </div>)
}