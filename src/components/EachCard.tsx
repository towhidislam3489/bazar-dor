import Image from 'next/image';
import React from 'react';


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

const EachCard = ({ data }: { data: Idatatype }) => {
    function toBanglaNumber(number: string | number | null | undefined): string {
        if (number === null || number === undefined) return '';

        const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

        return number.toString().replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
    }
    const isUp = data.change.dir === "up";
    const isDown = data.change.dir === "down";
    const pctText = Math.abs(data.change.pct).toFixed(1) + "%";
    return (
        <div className="bg-[#FAFCFA] border border-gray-200 p-2 rounded-[8px]">
            {/* <Image src={data.image} alt="Image" height={600} width={600}></Image> */}
            <div className="space-y-4">
                <div className="flex gap-4 items-center">
                    <div>
                        <span className="text-3xl bg-gray-300 rounded-2xl p-1">{data.image}</span>
                    </div>
                    <div>
                        <h1 className="text-[20px] font-bo">{data.nameBn}</h1>
                        <h1>প্রতি কেজি</h1>


                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-semibold">আজকের দাম</h1>
                        <span className="text-2xl">{toBanglaNumber(data.today)} </span> <span>টাকা</span>
                    </div>
                    <div>
                        <span
                            className={`font-semibold ${isUp
                                ? "text-red-600"
                                : isDown
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }`}
                        >
                            {isUp ? "▲" : isDown ? "▼" : "•"} {pctText}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EachCard;