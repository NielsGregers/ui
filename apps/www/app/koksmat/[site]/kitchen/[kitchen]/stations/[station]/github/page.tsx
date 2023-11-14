"use client"
import React, { useContext, useMemo } from 'react';
import ListTasks from './tasks';
import { KoksmatContext } from '@/app/koksmat/context';
import { PageContextSectionHeader } from '@/app/koksmat/[site]/components/page-section-header';



export default function Workspace() {
 const {currentstation} = useContext(KoksmatContext);    
   return <div>
      <PageContextSectionHeader title="Tasks" />
      {currentstation?.cwd &&
      <ListTasks cwd={currentstation?.cwd}  />
      }

   </div>
   
}

