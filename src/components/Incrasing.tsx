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

const Incrasing = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const data: Idatatype[] = await res.json();

    const AllIncrimentItem = data.filter(v => v.change.dir === 'up');

    const IncrimentItem = AllIncrimentItem.sort((a, b) => b.change.pct - a.change.pct);
    return (
        <div className="max-w-[70%] mx-auto mt-10">
            <h1 className="text-2xl mb-5"> <span className="text-red-600">▲</span> <span className="text-2xl font-bold"> আজ দাম বেড়েছে</span>  </h1>

            <div className="grid md:grid-cols-3  gap-5">
                {IncrimentItem.slice(0,6).map((v, ind) => <EachCard key={ind} data={v}></EachCard>)}
            </div>
        </div>
    );
};

export default Incrasing;