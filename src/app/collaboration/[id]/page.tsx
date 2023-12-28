import { ListingBanner } from "@/app/listing/[id]/(components)/ListingBanner";
import { Progress, Tabs, TabsProps } from "antd";
import { Suspense } from "react";
import { CollaborationRow } from "./(components)/CollaborationRow";
import { DesignerRow } from "./(components)/DesignerRow";
import { ProgressButtons } from "./(components)/ProgressButtons";
import { LinkToDesign } from "./(components)/LinkToDesign";
import { getUser } from "@/app/(database-queries)/user-queries";
import { getCollaborationById } from "@/app/(database-queries)/collaboration-queries";
import { permanentRedirect, redirect } from "next/navigation";
import { CollaborationBanner } from "./(components)/CollaborationBanner";




export default async function CollaborationPage ({
    params,
  }: {
    params: { id: string };
  }) {

    const user = await getUser();
    const collaboration = await getCollaborationById(+params.id);

    if( user.role === 'CLIENT')  {
      collaboration?.client.id !== user?.client?.id && permanentRedirect('/listings')
    }

    if( user.role === 'DESIGNER')  {
      collaboration?.designer.id !== user?.designer?.id && permanentRedirect('/profile')
    }

    const items: TabsProps['items'] = [
      {
        key: '1',
        label: <span className="px-2">Overview</span>,
        children: 
        <section className="min-h-[700px]">
           <div className="w-full min-h-[100px] flex flex-col gap-3 my-6 relative  ">
          <h1>Designers</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <DesignerRow id={+params.id} />
          </Suspense>
        </div>
    
        <div className="w-full min-h-[100px]  flex flex-col gap-3 my-6  ">
          <h1>Current Stage of the design</h1>
          <Suspense fallback={<div>Loading...</div>}>
          <ProgressButtons id={+params.id} />
          </Suspense>
        </div>
    
        <div className="w-full min-h-[200px]  flex flex-col gap-3 my-6  ">
          <h1>Link to Design file</h1>
          <Suspense fallback={<div>Loading...</div>}>
          <LinkToDesign id={+params.id} />
          </Suspense>
        </div>

        <div className="w-full min-h-[100px] flex flex-col gap-3 my-6 relative  ">
          <h1>Chat</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <DesignerRow id={+params.id} />
          </Suspense>
        </div>
    
       
        </section>
      },
      {
        key: '2',
        label: <div className="px-2 relative">
         <span> Requested Collaborations</span>
          </div>,
        children: 
        <section className="min-h-[700px]">
        <div className="w-full min-h-[500px] flex flex-col gap-3 my-6 relative  ">
       <h1>Designer Requested working with you</h1>
       
       </div>
       </section>
      }
    ]


 return  <section className=" min-h-[calc(100vh-120px)] mt-32 px-80 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
<div className="  bg-white border-solid border-[1px] border-gray-300 rounded-md flex gap-4 h-[320px] p-6 w-full my-4 ">
 <Suspense fallback={<div>Loading...</div>}>
 <CollaborationBanner id={+params.id} />
</Suspense>
</div>
<div className=" rounded-sm  flex gap-4 h-[100px] items-center  w-full ">
 <Suspense fallback={<div>Loading...</div>}>
 <CollaborationRow id={+params.id} />
</Suspense>
</div>
<Tabs className="my-4" tabBarGutter={3} defaultActiveKey="1" items={items} size="large" />
{/* <ProposalPreview id={listingById?.proposalId} /> */}
</section>

}