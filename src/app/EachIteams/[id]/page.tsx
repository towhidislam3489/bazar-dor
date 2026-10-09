import React from 'react';
// export const instant = false;


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
    markets:[
        {
      market: string,
      division: string,
      min: number,
      max: number
    }
    ]
}

const page = async({ params }: {
    params: Promise<{
        id: string;
    }>
}) => {
    const {id}=await params;
    const res=await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`)
    const data:Idatatype=await res.json();
    return (
        <div>
            {data.nameBn}
        </div>
    );
};

export default page;