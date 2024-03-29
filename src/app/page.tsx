import { Carousel } from './(components)/Carousel/Carousel'

import { HeroSection } from "./(components)/Hero/HeroSection";
import { Process } from './(components)/Process/Process';


export default function Home() {

  return (
    <section className=" px-80 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
     <HeroSection/>
     <Carousel/>
     <Process />
    </section>

  )
}
