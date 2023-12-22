import { Suspense } from "react";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Listing } from "./Listing";
import { Collaborations } from "./Collaborations";
import { Proposal } from "./Proposal";
import { ClientProfile } from "./ClientProfile";
import { RequestedCollaboration } from "./RequestedCollaboration";
import { getDesignersRequestingCollaboration } from "@/app/(database-queries)/listing-queries";

export const ClientProfilePage = async () => {
  const requestedCollaborations = await getDesignersRequestingCollaboration();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className="p-4">Overview</span>,
      children: 
      <section className="min-h-[700px]">
         <div className="w-full min-h-[100px] flex flex-col gap-3 my-6 relative  ">
        <h1>Active Listings</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Listing />
        </Suspense>
      </div>

      <div className="w-full min-h-[200px] h-[200px] flex flex-col gap-3 my-6  ">
        <h1>Ongoing Collaborations</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Collaborations />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Proposal />
      </Suspense>
      </section>
    },
    {
      key: '2',
      label: <div className="p-4 relative">
       <span> Requested Collaborations</span>
       {requestedCollaborations.length > 0 && <span className="absolute top-0 right-0 p-1 bg-red-500 rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold text-white ">{requestedCollaborations.length}</span> }
      
        </div>,
      children: 
      <section className="min-h-[700px]">
      <div className="w-full min-h-[500px] flex flex-col gap-3 my-6 relative  ">
     <h1>Designer Requested working with you</h1>
     <Suspense fallback={<div>Loading...</div>}>
       <RequestedCollaboration />
     </Suspense>
     </div>
     </section>
    }
  ]
  return (
    <>
       <div className="flex flex-col gap-3 mt-24 h-[320px]">
        <h1 className="text-2xl">Profile Information</h1>
        <Suspense fallback={<div>Loading...</div>}>
        <ClientProfile /> 
        </Suspense>
      </div>
      <Tabs className="mt-16" tabBarGutter={2} size="large"  defaultActiveKey="1" items={items}  />
    </>
  );
};
