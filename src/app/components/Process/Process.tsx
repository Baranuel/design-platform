import connect from '../../../../public/connect.svg'
import apply from '../../../../public/apply.svg'
import explore from '../../../../public/explore.svg'
import Image from 'next/image';

export const Process = () => {
  return (
    <section className="my-28 min-h-[80vh] w-full flex flex-col items-center">
      <span className=" tracking-[.25rem] w-full whitespace-nowrap self-center text-center  sm:text-decorText text-base  font-semibold  text-transparent bg-clip-text bg-gradient-to-b from-orange to-red-800">
        STEP BY STEP
      </span>
      <h1 className="  mt-1 text-6xl xl:text-5xl lg:text-5xl sm:text-4xl text-center font-black text-transparent bg-clip-text bg-gradient-to-b from-stone-600 from-40%  via-stone-700 via-60% to-stone-800 to-100%  ">
        How does it work ?
      </h1>
      <div className="relative flex gap-6 flex-col h-[100vh] w-full mt-24 ">
        <span className="absolute z-0 top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-3/4 h-3/4 bg-purple/5 rounded-full bg-gradient-radial from-purple/5 from-90%  to-transparent to-10% blur-[199px]"></span>  {/* Blur*/}
      <span className="absolute block lg:hidden left-[50%] h-full w-[1px] bg-gradient-to-b from-transparent via-purple to-transparent"></span>    {/* Divider*/}
        {/* First element*/}
        <div className=" w-full h-2/3 bg-transparent flex lg:items-center lg:justify-center ">
            <div className="w-1/2 lg:w-2/3 h-full relative ">
                <span className="block lg:hidden absolute w-3 h-3 bg-gradient-to-b from-orange to-red-800 rounded-full -right-0 top-[50%] -translate-y-[50%] translate-x-[50%] z-40"></span>
                <span className="block lg:hidden absolute top-[50%] right-0 w-[10%] bg-gradient-to-l from-purple to-stone-500 h-[1px] "></span>
                <div className=" rounded-md bg-white border border-solid border-purple w-[90%] lg:w-full h-full p-14 flex flex-col justify-evenly gap-6   "> {/* CONTENT OF THE BOX*/}
                  <div className="flex flex-col gap-3 items-start ">  {/* Title Box*/}
                  <span className="relative w-12 h-12  border-purple rounded-md">
                  <Image src={apply} alt="apply" fill/>
                 </span> {/* Icon*/}
                  <h2 className="text-stone-800 font-semibold">Client: Apply for Re-Design</h2>
                  </div>
                  <p className=" text-xl font-light">First upload your current website and describe your business so designers get some key information about what direction to take.</p>
                  <button className="p-2 w-[200px] shadow-none rounded-lg border border-purple bg-purple text-white text-base hover:cursor-pointer hover:bg-white hover:text-purple transition-colors">Upload Website</button>
                </div>
            </div>
        </div>
        {/* Second element*/}
        <div className="mt-[-180px] lg:mt-0  w-full h-2/3 flex justify-end lg:items-center lg:justify-center">
            <div className="w-1/2 lg:w-2/3 flex justify-end h-full relative">
            <span className="block lg:hidden absolute w-3 h-3 bg-gradient-to-b from-orange to-red-800  rounded-full left-0 top-[50%] -translate-y-[50%] -translate-x-[50%] z-40"></span>
                <span className="block lg:hidden absolute top-[50%] left-0 w-[10%] bg-gradient-to-l from-purple to-stone-500 h-[1px]"></span>
                  <div className=" rounded-md bg-white border border-solid border-purple w-[90%] lg:w-full h-full p-14 flex flex-col justify-evenly gap-6   ">
                 <div className="flex flex-col gap-3 items-start ">  {/* Title*/}
                 <span className="relative w-12 h-12  border-purple rounded-md">
                  <Image src={explore} alt="explore" fill/>
                 </span>
                 <h2 className="text-stone-800 font-semibold">Designer: Explore</h2>
                 </div>
                 <p className=" text-xl font-light">Designers and enthusiasts can find websites to work on to help out a business and expand their portfolio and skills.</p>
                 <button className="p-2 w-[200px] shadow-none rounded-lg border border-purple bg-white text-purple text-base hover:cursor-pointer hover:bg-purple hover:text-white  transition-colors">Explore</button>
                 </div>
            </div>
        </div>
         {/* Third element*/}
         <div className="mt-[-180px] lg:mt-0 w-full h-3/5 flex self-start lg:items-center lg:justify-center">
            <div className="w-1/2 lg:w-2/3 h-full relative">
            <span className="block lg:hidden absolute w-3 h-3 bg-gradient-to-b from-orange to-red-800  rounded-full -right-0 top-[50%] -translate-y-[50%] translate-x-[50%] z-40"></span>
                <span className="block lg:hidden absolute top-[50%] right-0 w-[10%] bg-gradient-to-l from-purple to-stone-500 h-[1px]"></span>
                <div className=" rounded-md bg-white border border-solid border-purple w-[90%] lg:w-full h-full p-14 flex flex-col justify-evenly gap-6   "> {/* CONTENT OF THE BOX*/}
                <div className="flex flex-col gap-3 items-start ">  {/* Title Box*/}
                  <span className="relative w-12 h-12  border-purple rounded-md">
                  <Image src={connect} alt="connect" fill/>
                 </span>{/* Icon*/}
                    <h2 className="text-stone-800 font-semibold">Stay Connected</h2>
                  </div>
                  <p className=" text-xl font-light">Once a designer decided to work on your website you can keep the communication going via chat inside the app and provide valuable input.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
