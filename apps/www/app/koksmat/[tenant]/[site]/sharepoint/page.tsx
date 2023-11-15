import React from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';

export default function ClusterInfo() {
   
    return (<div><div>Clusters</div>
      <RunServerProcess cmd={'pwsh'} args={["/Users/nielsgregersjohansen/kitchens/noma/get-site-allpages-test.ps1","-siteurl","https://christianiabpos.sharepoint.com/sites/nexiintra-hub"]} timeout={3600} channelname={'pwsh'}  />
    
    </div>)
}