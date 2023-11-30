'use client'
import {  useEffect, useRef, } from "react";
import Image from "next/image";
import React from "react";
import ugly1 from '../../../../public/ugly-1.svg'
import ugly2 from '../../../../public/ugly-2.svg'
import ugly3 from '../../../../public/ugly-3.svg'
import pretty1 from '../../../../public/pretty-1.svg'
import pretty2 from '../../../../public/pretty-2.svg'
import pretty3 from '../../../../public/pretty-3.svg'



export const Carousel = () => {
  const elements = [{
    ugly: ugly1,
    pretty: pretty1
  }, {
    ugly: ugly2,
    pretty: pretty2
  },{
    ugly: ugly3,
    pretty: pretty3
  },4];
  const elementRefs = useRef<any[]>(elements.map(() => React.createRef()));
  const dividerRef = useRef<HTMLDivElement>(null)
  const [showDivider, setShowDivider] = React.useState(false)


  const calculateDividerOverlap = () => {
    if(!dividerRef.current) return false
    const divider = dividerRef.current
    const dividerRect = divider?.getBoundingClientRect()
    const uglyElements = document.querySelectorAll('#ugly-element')
    const uglyElementsRects = Array.from(uglyElements).map(element => element.getBoundingClientRect())
    const uglyElementsOverlap = uglyElementsRects.some(element => {
      const overlap = element.left + 5  < dividerRect.left + dividerRect.width && element.left + element.width > dividerRect.left
      return overlap
    })
    return uglyElementsOverlap
  }

  useEffect(() => {
    let frame = 0
    function overlapCheck(){
      const dividerVisible = calculateDividerOverlap()
      setShowDivider(dividerVisible)
      frame = requestAnimationFrame(overlapCheck)
    }

    overlapCheck()

    return () => cancelAnimationFrame(frame)
  })

  const renderUgly = () => elements.map((element:any, index) => {

    return (
      <div
      id='ugly-element'
      key={index}
      ref={elementRefs.current[index]}
      className="relative h-[250px] sm:h-[170px] w-[400px] sm:w-[300px]  bg-black rounded-md"
    >
{      element.ugly && <Image fill src={element.ugly} alt="ugly" />}
    </div>
    );
  })

  const renderPretty = () => elements.map((element:any, index) => {
    return (
      <div
      id='pretty-element'
      ref={elementRefs.current[index]}
        key={index}
        className="relative h-[250px] sm:h-[170px] w-[400px] sm:w-[300px]  rounded-md"
      >
      { element.pretty && <Image src={element.pretty} alt="pretty" fill />}

      </div>
    );
  })
  
  return (
    <section className="my-28 h-[50vh] w-full flex flex-col items-center">
      <span className=" tracking-[.25rem] w-full whitespace-nowrap self-center text-center  sm:text-decorText text-base  font-semibold  text-transparent bg-clip-text bg-gradient-to-b from-orange to-red-800">
        MASTERING INSTRUMENTS
      </span>
      <h1 className="  mt-1 text-6xl xl:text-5xl lg:text-5xl sm:text-4xl text-center font-black text-transparent bg-clip-text bg-gradient-to-b from-stone-600 from-40%  via-stone-700 via-60% to-stone-800 to-100%  ">
        Acquire new look
      </h1>
      <div className="relative w-screen ">
      <div className=" mt-6 absolute w-full flex overflow-hidden clip-path-reverse sm:clip-path-reverse-small ">
      <div className={`absolute z-40 h-[80%] sm:h-[90%] left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-2 bg-[#6045D6] rounded-sm ${showDivider ? "opacity-100" : "opacity-0"} transition-opacity `}></div>
        <div className="py-12 sm:py-6 flex gap-16 flex-row animate-scroll ">
         {renderUgly()}
        </div>
        <div className=" absolute   flex flex-row gap-16 top-0 py-12 sm:py-6  animate-scroll2">
          {renderUgly()}
        </div>
      </div>
      <div className=" mt-6 absolute flex gap-16 w-screen overflow-hidden clip-path sm:clip-path-small">
      <div  ref={dividerRef} className={`absolute z-40 h-[250px] sm:h-[170px] left-[50%] top-[50%] -translate-y-[50%]  w-6 bg-gradient-to-r from-purple from-10% to-transparent rounded-sm ${showDivider ? "opacity-100" : "opacity-0"} transition-opacity `}>

      </div>
      <div  ref={dividerRef} className={`absolute z-40 h-[80%] sm:h-[90%] left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-4 bg-[#6045D6] rounded-sm ${showDivider ? "opacity-100" : "opacity-0"} transition-opacity `}>

      </div>

        <div className="py-12 sm:py-6    flex gap-16 flex-row animate-scroll">
          {renderPretty()}
        </div>

        <div className="absolute  flex flex-row gap-16 top-0 py-12 sm:py-6  animate-scroll2">
          {renderPretty()}
        </div>
      </div>
   
      </div>
         </section>
  );
};
