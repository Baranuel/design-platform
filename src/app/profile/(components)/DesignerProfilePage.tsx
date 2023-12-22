import { Suspense } from "react"
import { ClientButton } from "./ClientButton"
import { DesignerProfile } from "./DesignerProfile";
import { Tabs, TabsProps } from "antd";
import { Collaborations } from "./Collaborations";
import { RequestedCollaboration } from "./RequestedCollaboration";





export const DesignerProfilePage = async () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className="p-4">Overview</span>,
      children: 
      <section className="min-h-[700px]">

      <div className="w-full min-h-[200px] h-[200px] flex flex-col gap-3 my-6  ">
        <h1>Ongoing Collaborations</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Collaborations />
        </Suspense>
      </div>

      </section>
    },
    {
      key: '2',
      label: <span className="p-4">Requested Collaborations</span>,
      children: 
      <section className="min-h-[700px]">

     </section>
    }
  ]
  return (
    <>
       <div className="flex flex-col gap-3 mt-24 h-[320px]">
        <h1 className="text-2xl">Profile Information</h1>
        <Suspense fallback={<div>Loading...</div>}>
        <DesignerProfile /> 
        </Suspense>
      </div>
      <Tabs className="mt-16" tabBarGutter={2} size="large"  defaultActiveKey="1" items={items}  />
    </>
  );

}