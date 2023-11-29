export const Carousel = () => {
  const elements = [1, 2, 3, 4, 5, 6, 7];

  const renderUgly = () => elements.map((element, index) => {
    return (
      <div
        key={index}
        className="h-[300px] w-[400px] flex-shrink-0 bg-black rounded-md"
      ></div>
    );
  })

  const renderPretty = () => elements.map((element, index) => {
    return (
      <div
        key={index}
        className="h-[300px] w-[400px] flex-shrink-0 bg-purple rounded-md"
      ></div>
    );
  })

  return (
    <section className="my-28 h-[50vh] w-full flex flex-col items-center">
      <span className=" tracking-[.25rem] w-full whitespace-nowrap self-center text-center  sm:text-decorText text-base  font-semibold  text-transparent bg-clip-text bg-gradient-to-b from-orange to-red-800">
        MASTERING INSTRUMENTS
      </span>
      <h1 className=" mt-1 text-6xl xl:text-5xl lg:text-5xl sm:text-4xl text-center font-black text-transparent bg-clip-text bg-gradient-to-b from-stone-600 from-40%  via-stone-700 via-60% to-stone-800 to-100%  ">
        Acquire new look
      </h1>
      <div className="relative w-screen ">
      <div className=" mt-6 absolute flex gap-2 w-screen overflow-hidden clip-path-reverse">
        <div className="py-12 mx-2 flex gap-2 flex-row animate-scroll whitespace-nowrap">
         {renderUgly()}
        </div>
        <div className="absolute flex flex-row gap-2 top-0 py-12 animate-scroll2 whitespace-nowrap">
          {renderUgly()}
        </div>
      </div>
      <div className=" mt-6 absolute flex gap-2 w-screen overflow-hidden clip-path">
        <div className="py-12 mx-2 flex gap-2 flex-row animate-scroll whitespace-nowrap">
          {renderPretty()}
        </div>
        <div className="absolute flex flex-row gap-2 top-0 py-12 animate-scroll2 whitespace-nowrap">
          {renderPretty()}
        </div>
      </div>

      </div>
         </section>
  );
};
