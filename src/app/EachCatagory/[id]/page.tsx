import EachCard from '@/components/EachCard';
import React from 'react';
import NotFound from './not-found';
import SortedCards from './SortedCard';




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

const page = async ({ params }: {
    params: Promise<{
        id: string;
    }>
}) => {
    function toBanglaNumber(number: string | number | null | undefined): string {
        if (number === null || number === undefined) return '';

        const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

        return number.toString().replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
    }
    const { id } = await params;
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${id}`)
    const data: Idatatype[] = await res.json();

    console.log(data);
    const tot = data.reduce((acc) => acc + 1, 0);
    console.log(tot);
    return (
        <div>
            {tot === 0 ? NotFound() : <div className="max-w-[70%] mx-auto space-y-4">
                <div className="flex gap-4 items-center bg-[#FAFCFA] border border-gray-200 rounded-2xl py-6 px-4" >
                    <p className="text-4xl">{data[0].image}</p>
                    <div>
                        <p className="text-2xl font-semibold" >{data[0].nameBn}</p>
                        <p>{`${toBanglaNumber(tot)}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
                    </div>
                </div>
                

                {/* <p>{`মোট ${toBanglaNumber(tot)}টি পণ্য দেখানো হচ্ছে`}</p> */}

                {/* <div className="grid  md:grid-cols-3 gap-4">
                    {data.map(v => <EachCard key={v.id} data={v}></EachCard>)}
                </div> */}
                <SortedCards data={data}></SortedCards>


            </div>}
        </div>
    );
};

export default page;