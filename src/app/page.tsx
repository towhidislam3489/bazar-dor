import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Decrement from "@/components/Decriment";
import Incrasing from "@/components/Incrasing";
import { Suspense } from "react";


const page = () => {

  return (
    <div>
      <Banner></Banner>
      <Suspense fallback={<div className="flex justify-center items-center min-h-[200px] w-full "><span className="loading loading-spinner text-success"></span></div>}>
        <Incrasing></Incrasing>
          <Decrement></Decrement>
          <AllProducts></AllProducts>
      </Suspense>
    </div>
  );
};

export default page;