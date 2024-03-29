import { Button } from "antd";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="w-full mb-16 relative min-h-[85vh]  h-fit flex  flex-col gap-10 sm:gap-8 items-center justify-center">
      <h1 className=" text-8xl xl:text-7xl lg:text-6xl sm:text-5xl text-center font-bold sm:font-black text-transparent bg-clip-text bg-gradient-to-b from-stone-600 from-40%  via-stone-700 via-60% to-stone-800 to-100%  ">
          Let Talent Take Care of Your{" "}
          <span className="animate-text font-bold sm:font-black text-center text-transparent bg-clip-text bg-gradient-to-l from-[#896FFD] from-30% 2xl:from-40%  via-[#6B11C6] via-70% to-[#896FFD] to-90% ">
            Online Presence
          </span>{" "}
        </h1>

      <p className="text-xl text-center max-w-[65ch] xl:text-xl md:text-md sm:text-base font-light text-stone-700">
        Your friendly hub for free website makeovers! Businesses meet volunteer
        designers ready to sprinkle their magic
      </p>
      <div className=" w-full pt-4 sm:pt-1 flex sm:flex-col gap-4 sm:gap-2 items-center justify-center">
      <Link href="/profile">
      <Button type="primary" className="p-2 h-full min-w-[200px] sm:w-full shadow-none rounded-lg text-base ">Upload Website</Button>
      </Link>
      <Link href="/listings">
      <Button type="default" className="p-2 h-full min-w-[200px] sm:w-full shadow-none rounded-lg text-base ">Explore</Button>
      </Link>
      </div>
    </section>
  );
};
