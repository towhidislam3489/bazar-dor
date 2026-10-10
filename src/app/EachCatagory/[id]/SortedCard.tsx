"use client";

import { useState, useMemo } from "react";
import EachCard from "@/components/EachCard";

export interface Idatatype {
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

const SortedCards = ({ data }: { data: Idatatype[] }) => {
    const [sort, setSort] = useState("default");

    const sortedData = useMemo(() => {
        const copy = [...data]; // original array change korbo na
        if (sort === "low-to-high") return copy.sort((a, b) => a.today - b.today);
        if (sort === "high-to-low") return copy.sort((a, b) => b.today - a.today);
        return copy; // default
    }, [data, sort]);
    function toBanglaNumber(number: string | number | null | undefined): string {
        if (number === null || number === undefined) return '';

        const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

        return number.toString().replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
    }
    const tot = data.reduce((acc) => acc + 1, 0);

    return (
        <>
            <div className="items-center bg-[#FAFCFA] border border-gray-200 rounded-2xl py-6 px-4 flex justify-end">
                <div className="flex items-center gap-3">
                    <label className="label-text">সাজান</label>
                    <div className="select-wrapper border-2 border-gray-700 rounded-[5px]">
                        <select
                            id="sort-options"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low-to-high">কম থেকে বেশি</option>
                            <option value="high-to-low">বেশি থেকে কম</option>
                        </select>
                    </div>
                </div>
            </div>
            <p>{`মোট ${toBanglaNumber(tot)}টি পণ্য দেখানো হচ্ছে`}</p>
            <div className="grid md:grid-cols-3 gap-4">
                {sortedData.map((v) => (
                    <EachCard key={v.id} data={v} />
                ))}
            </div>
        </>
    );
};

export default SortedCards;