
export const HeroSection = () => {
  return (
    <section className="w-full mb-16 relative min-h-[80vh]  h-fit flex  flex-col gap-10 sm:gap-4 items-center justify-center">
      <h1 className=" text-7xl xl:text-7xl lg:text-6xl sm:text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-b from-stone-600 from-40%  via-stone-700 via-60% to-stone-800 to-100%  ">
          Let Talent Take Care of Your{" "}
          <span className="animate-text  font-bold text-center text-transparent bg-clip-text bg-gradient-to-l from-[#896FFD] from-30% 2xl:from-40%  via-[#6B11C6] via-70% to-[#896FFD] to-90% ">
            Online Presence
          </span>{" "}
        </h1>

      <p className="text-xl text-center max-w-[65ch] xl:text-xl md:text-md sm:text-base font-light text-stone-700">
        Your friendly hub for free website makeovers! Businesses meet volunteer
        designers ready to sprinkle their magic
      </p>
      <div className=" pt-4 sm:pt-1 flex sm:flex-col gap-4 sm:gap-2 items-center justify-center">
      <button className="p-2 w-[200px] shadow-none rounded-lg border border-purple bg-purple text-white text-base hover:cursor-pointer hover:bg-white hover:text-purple transition-colors">Upload Website</button>
      <button className="p-2 w-[200px] shadow-none rounded-lg border border-purple bg-white text-purple text-base hover:cursor-pointer hover:bg-purple hover:text-white  transition-colors">Explore</button>
      </div>
    </section>
  );
};
