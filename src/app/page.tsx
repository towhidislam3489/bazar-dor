import Banner from "@/components/Banner";
import Decrement from "@/components/Decriment";
import Incrasing from "@/components/Incrasing";
import { Suspense } from "react";


const page = () => {

  return (
    <div>
      <Banner></Banner>
      <Suspense fallback={<div className="items-center "><span className="loading loading-spinner text-success"></span></div>}>
        <Incrasing></Incrasing>
          <Decrement></Decrement>
      </Suspense>
    </div>
  );
};

export default page;