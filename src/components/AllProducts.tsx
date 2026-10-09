import React from 'react';
import EachCard from './EachCard';


interface Idatatype {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: string;
        pct: number;
    };
}

const AllProducts = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const data: Idatatype[] = await res.json();

    const IncrimentItem = data;

    // const IncrimentItem = AllIncrimentItem.sort((a, b) => b.change.pct - a.change.pct);

    const total = IncrimentItem.reduce((acc) => acc + 1, 0);
    return (
        <div className="max-w-[70%] mx-auto mt-10" id="all-products">
            <h1 className="text-2xl mb-3">  <span className="text-2xl font-bold"> সব পণ্য</span>  </h1>
            <h1 className="mb-5">মোট {total}টি পণ্য দেখানো হচ্ছে</h1>

            <div className="grid grid-cols-3 gap-5">
                {IncrimentItem.map((v, ind) => <EachCard key={ind} data={v}></EachCard>)}
            </div>
        </div>
    );
};

export default AllProducts;