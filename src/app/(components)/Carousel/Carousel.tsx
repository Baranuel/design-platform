'use client'
import {  useEffect, useRef, } from "react";
import Image from "next/image";
import React from "react";
import ugly1 from '../../../../public/ugly-1.svg'
import ugly2 from '../../../../public/ugly-2.svg'
import ugly3 from '../../../../public/ugly-3.svg'
import ugly4 from '../../../../public/ugly-4.svg'
import pretty1 from '../../../../public/pretty-1.svg'
import pretty2 from '../../../../public/pretty-2.svg'
import pretty3 from '../../../../public/pretty-3.svg'
import pretty4 from '../../../../public/pretty-4.svg'
import { calculateDividerOverlap } from "@/app/helpers/calculate-divider-overlap";

const elements = [{
  ugly: ugly1,
  pretty: pretty1
}, {
  ugly: ugly2,
  pretty: pretty2
},{
  ugly: ugly3,
  pretty: pretty3
},{
  ugly: ugly4,
  pretty: pretty4
}];


export const Carousel = () => {
  const elementRefs = useRef<any[]>(elements.map(() => React.createRef()));
  const dividerRef = useRef<HTMLDivElement>(null)

  const [showDivider, setShowDivider] = React.useState(false)

  useEffect(() => {
    if(!dividerRef.current) return
    const divider = dividerRef.current
    const dividerRect = divider?.getBoundingClientRect()

    let frame = 0
    function overlapCheck(){
      const uglyElements = document.querySelectorAll('#ugly-element')
      const uglyElementsRects = Array.from(uglyElements).map(element => element.getBoundingClientRect())
      const dividerVisible = calculateDividerOverlap(dividerRect, uglyElementsRects)
      setShowDivider(dividerVisible)
      frame = requestAnimationFrame(overlapCheck)
    }

    overlapCheck()

    return () => cancelAnimationFrame(frame)
  }, [])


  const renderUgly = () => elements.map((element:any, index) => {
    return (
      <div
      id='ugly-element'
      key={index}
      ref={elementRefs.current[index]}
      className="relative h-[250px] sm:h-[180px] w-[400px] sm:w-[290px]  shadow-xl overflow-hidden"
    >
{      element.ugly && <Image priority fill src={element.ugly} alt="ugly" />}
    </div>
    );
  })

  const renderPretty = () => elements.map((element:any, index) => {
    return (
      <div
      id='pretty-element'
      ref={elementRefs.current[index]}
      key={index}
      className="relative  h-[250px] sm:h-[180px] w-[400px] sm:w-[290px]  border-solid border-stone-200 shadow-xl overflow-hidden rounded-md"
      >
      { element.pretty && <Image priority src={element.pretty} alt="pretty" fill  />}

      </div>
    );
  })
  
  return (
    <section className="my-24 sm:my-8 min-h-[70vh] h-[485px] w-full flex flex-col items-center">
      <span className=" tracking-[.25rem] w-full whitespace-nowrap self-center text-center  sm:text-xs text-base  font-semibold  text-transparent bg-clip-text bg-gradient-to-b from-orange to-red-800">
        MASTERING INSTRUMENTS
      </span>
      <h1 className="  mt-1 text-6xl xl:text-5xl lg:text-5xl sm:text-3xl text-center font-black text-transparent bg-clip-text bg-gradient-to-b from-stone-600 from-40%  via-stone-700 via-60% to-stone-800 to-100%  ">
        Acquire new look
      </h1>
      <div className="relative w-screen h-[410px] sm:h-[305px] ">
        <div className=" mt-4 absolute w-full flex overflow-hidden clip-path-reverse sm:clip-path-reverse-small ">
        <div className={`absolute z-40 h-[80%] sm:h-[90%] left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-2 bg-[#6045D6] rounded-sm ${showDivider ? "opacity-100" : "opacity-50 bg-stone-200"} transition-opacity `}></div>
        <div className="py-12 sm:py-8 flex gap-16 flex-row animate-scroll ">
         {renderUgly()}
        </div>
        <div className=" absolute   flex flex-row gap-16 top-0 py-12 sm:py-8  animate-scroll2">
          {renderUgly()}
        </div>
      </div>
      <div className=" mt-4 w-full absolute flex gap-16  overflow-hidden clip-path sm:clip-path-small">
      <div  ref={dividerRef} className={`absolute flex items-center gap-2  z-40 h-[250px] sm:h-[190px] left-[50%] top-[50%] -translate-y-[50%]  w-3 bg-gradient-to-r from-purple from-10% to-transparent rounded-sm ${showDivider ? "opacity-100" : "opacity-0"} transition-opacity `}>
        <div className="w-[9px] blur-sm h-[95%] my-2 self-center bg-white drop-shadow-glow ">1</div>
      </div>
      <div  ref={dividerRef} className={`absolute z-40 h-[80%] sm:h-[90%] left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-4 bg-[#6045D6] rounded-sm ${showDivider ? "opacity-100" : "opacity-50 bg-stone-200"} transition-opacity `}>

      </div>

        <div className="py-12 sm:py-8   flex gap-16 flex-row animate-scroll">
          {renderPretty()}
        </div>

        <div className="absolute  flex flex-row gap-16 top-0 py-12 sm:py-8  animate-scroll2">
          {renderPretty()}
        </div>
      </div>
   
      </div>
      <p className="text-xl text-center max-w-[65ch] xl:text-xl md:text-md sm:text-base font-light text-stone-700">
      Your friendly hub for free website makeovers! Businesses meet volunteer designers ready to sprinkle their magic
      </p>
         </section>
  );
};
