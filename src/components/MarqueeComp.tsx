// import { spawn } from 'child_process';
// import { Span } from 'next/dist/trace';
// import React from 'react';


// interface Idatatype {
//     id: number,
//     slug: string,
//     nameBn: string,
//     category: string,
//     categoryNameBn: string,
//     categoryIcon: string,
//     unit: string,
//     image: string,
//     today: number,
//     yesterday: number,
//     lastWeek: number,
//     lastMonth: number,
//     change: {
//         dir: string,
//         pct: number
//     }
// }
// import MarqueeText from "react-marquee-text"
// import "react-marquee-text/dist/styles.css"
// const MarqueeComp = async () => {
//     const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
//     const data: Idatatype[] = await res.json();
//     return (
//         <div  className="space-y-3 mt-3" >
//             <hr className="border border-gray-200" />
//             <MarqueeText direction="right" duration={20}>
//                 {data.map(v => <span key={v.id} className="px-7">{v.nameBn}</span>)}
//             </MarqueeText>
//             <hr className="border border-gray-200" />
//         </div>
//     );
// };

// export default MarqueeComp;

import Link from 'next/link';
import React from 'react';
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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

const MarqueeComp = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const data: Idatatype[] = await res.json();

    return (
        <div className="space-y-2 mt-3">
            <hr className="border border-gray-200" />
            <div className="marquee-wrapper">
                <MarqueeText direction="right" duration={15}>
                    {data.map((v) => {
                        const isUp = v.change.dir === "up";
                        const isDown = v.change.dir === "down";
                        const pctText = Math.abs(v.change.pct).toFixed(1) + "%";

                        return (
                            <Link href={`/EachIteams/${v.id}`} key={v.id} className="hover:underline hover:decoration-green-600 underline-offset-4">
                                <span

                                    className="inline-flex items-center gap-1.5 px-6 whitespace-nowrap text-sm"
                                >
                                    <span className="text-base">{v.image || v.categoryIcon}</span>
                                    <span className="font-medium text-gray-800">{v.nameBn}</span>
                                    <span className="text-gray-700">
                                        {v.today} টাকা/{v.unit === "kg" ? "কেজি" : v.unit}
                                    </span>
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
                                </span>
                            </Link>
                        );
                    })}
                </MarqueeText>
            </div>
            <hr className="border border-gray-200" />
        </div>
    );
};

export default MarqueeComp;