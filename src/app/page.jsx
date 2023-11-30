import Arduino from "@/components/Arduino";
import Usuario from "@/components/Usuario";

function HomePage() {
  return (
    <div className="container mx-auto text-white h-screen flex justify-center items-center">
      <div className="md:w-4/5 lg:w-4/5 xl:w-3/5 grid grid-cols-2 gap-x-10">
        <Arduino />
        <Usuario />
      </div>
    </div>
  )
}

export default HomePage;
