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

const Decrement = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const data: Idatatype[] = await res.json();

    const AlldecrimentItem = data.filter(v => v.change.dir === 'down');

    const decrimentItem = AlldecrimentItem.sort((a, b) => a.change.pct - b.change.pct);
    return (
        <div className="max-w-[70%] mx-auto mt-10">
            <h1 className="text-2xl mb-5"> <span className="text-green-600">▼</span> <span className="text-2xl font-bold"> আজ দাম কমেছে</span>  </h1>

            <div className="grid grid-cols-3 gap-5">
                {decrimentItem.slice(0,6).map((v, ind) => <EachCard key={ind} data={v}></EachCard>)}
            </div>
        </div>
    );
};

export default Decrement;