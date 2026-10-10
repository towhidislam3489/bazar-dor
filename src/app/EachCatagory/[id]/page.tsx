import EachCard from '@/components/EachCard';
import React from 'react';
import NotFound from './not-found';
import SortedCards from './SortedCard';
import { Metadata } from 'next';

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

// Generate dynamic metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    try {
        const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${id}`);

        if (!res.ok) {
            return {
                title: "পণ্যের বাজারদর",
                description: "বাজারদরের তথ্য",
            };
        }

        const data: Idatatype[] = await res.json();

        if (!data || data.length === 0) {
            return {
                title: "তথ্য পাওয়া যায়নি",
                description: "কোনো পণ্য পাওয়া যায়নি",
            };
        }

        const categoryTitle = data[0].categoryNameBn || data[0].category;

        return {
            title: `${categoryTitle} - আজকের বাজারদর`,
            description: `${categoryTitle} ক্যাটাগরির পণ্যের আজকের বাজারদর ও দামের পরিবর্তন।`,
        };
    } catch {
        return {
            title: "পণ্যের বাজারদর",
            description: "বাজারদরের তথ্য",
        };
    }
}

function toBanglaNumber(number: string | number | null | undefined): string {
    if (number === null || number === undefined) return '';

    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    return number.toString().replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
}

const Page = async ({ params }: {
    params: Promise<{
        id: string;
    }>
}) => {
    const { id } = await params;
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${id}`)
    const data: Idatatype[] = await res.json();

    const tot = data.reduce((acc) => acc + 1, 0);

    return (
        <div>
            {tot === 0 ? NotFound() : <div className="max-w-[70%] mx-auto space-y-4">
                <div className="flex gap-4 items-center bg-[#FAFCFA] border border-gray-200 rounded-2xl py-6 px-4" >
                    <p className="text-4xl">{data[0].image}</p>
                    <div>
                        <p className="text-2xl font-semibold" >{data[0].categoryNameBn}</p>
                        <p>{`${toBanglaNumber(tot)}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
                    </div>
                </div>

                <SortedCards data={data}></SortedCards>

            </div>}
        </div>
    );
};

export default Page;