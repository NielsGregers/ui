import React from 'react';


import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import ListPods from '.';
import { PageContextHeader } from '../../components/page-context-header';


export default function Pods() {

  return (<div>
    <PageContextHeader title="Pods" />
    <ListPods />
  </div>)
}