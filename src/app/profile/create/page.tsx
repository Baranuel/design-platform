import { currentUser } from "@clerk/nextjs";
import { MultistepForm } from "./_components/MultiStepForm";


const ProfileCreate = async () => {
  const user = await currentUser();
  
  return (
    <section className=" flex flex-col items-center justify-center h-[calc(100vh-120px)] w-screen px-72 2xl:px-64 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
      <div className="bg-white flex flex-col gap-2 mt-8  w-2/3 md:w-full h-full p-4 sm:p-0">
        <h1>Welcome {user?.firstName}</h1>
        <p>
          You are almost there, we just need to finish your profile and after
          that you are all set
        </p>
          <MultistepForm/>
      </div>
    </section>
  );
};

export default ProfileCreate;
