

export const Blur = () => {
    return <div className=" sm:hidden w-full max-w-screen z-0 flex justify-between relative">
         <div className="absolute  z-20 -top-[400px] -left-[200px] h-[800px] w-[800px] rounded-full bg-gradient-radial from-purple/5 from-90%  to-transparent to-10% blur-3xl"></div>
      <div className="absolute z-20 -top-[400px] -right-[250px] h-[900px] w-[900px] rounded-full bg-gradient-radial from-purple/5 from-70%  to-transparent to-30% blur-3xl"></div>

    </div>
}