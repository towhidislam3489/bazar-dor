// import React from 'react';
// // export const instant = false;


// interface Idatatype {
//     id: number;
//     slug: string;
//     nameBn: string;
//     category: string;
//     categoryNameBn: string;
//     categoryIcon: string;
//     unit: string;
//     image: string;
//     today: number;
//     yesterday: number;
//     lastWeek: number;
//     lastMonth: number;
//     change: {
//         dir: string;
//         pct: number;
//     };
//     markets: [
//         {
//             market: string,
//             division: string,
//             min: number,
//             max: number
//         }
//     ]
// }

// const page = async ({ params }: {
//     params: Promise<{
//         id: string;
//     }>
// }) => {
//     function toBanglaNumber(number: string | number | null | undefined): string {
//         if (number === null || number === undefined) return '';

//         const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

//         return number.toString().replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
//     }
//     const { id } = await params;
//     const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`)
//     const data: Idatatype = await res.json();
//     let max_price = 0
//     data.markets.map(v => max_price < v.max ? max_price = v.max : "")
//     let min_price = max_price;
//     data.markets.map(v => min_price > v.min ? min_price = v.min : "")

//     console.log(max_price, "max");
//     console.log(min_price, "min");

//     return (
//         <div className="max-w-[70%] mx-auto">
//             <div>
//                 <div className="flex gap-4 items-center bg-[#FAFCFA] border border-gray-200 rounded-2xl py-6 px-4" >
//                     <p className="text-4xl">{data.image}</p>
//                     <div>
//                         <p className="text-2xl font-semibold" >{data.nameBn}</p>
//                         <p>{`প্রতি কেজি · ${data.categoryNameBn}`}</p>

//                         {data.change.dir === 'up' ? <p>{`গতকালের তুলনায় আজ দাম বেড়েছে · ${toBanglaNumber(data.today - data.yesterday)} টাকা`}</p> : data.change.dir === 'down' ? <p>{`গতকালের তুলনায় আজ দাম কমেছে · ${toBanglaNumber(data.yesterday - data.today)} টাকা`}</p> : <p>দাম একই রয়েছে</p>}

//                     </div>
//                 </div>
//                 <div className="flex gap-4 items-center bg-[#FAFCFA] border border-gray-200 rounded-2xl py-6 px-4" >
//                     <div className="flex justify-between">
//                         <div className="">
//                             <p>সর্বনিম্ন দাম</p>
//                             <p className="text-green-500 text-2xl">{toBanglaNumber(min_price)} টাকা</p>
//                             <p>সবচেয়ে কম দামের বাজার</p>
//                         </div>
//                         <div className="">
//                             <p>সর্বাধিক দাম</p>
//                             <p className="text-red-500 text-2xl">{toBanglaNumber(max_price)} টাকা</p>
//                             <p>সবচেয়ে বেশি দামের বাজার</p>
//                         </div>
//                         <div className="">
//                             <p>গড় দাম</p>
//                             <p className="text-green-500 text-2xl">{toBanglaNumber((max_price+min_price)/2)} টাকা</p>
//                             <p>প্রতি কেজি-এর হিসাবে</p>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default page;




// import React from "react";

// interface Market {
//   market: string;
//   division: string;
//   min: number;
//   max: number;
// }

// interface Idatatype {
//   id: number;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn: string;
//   categoryIcon: string;
//   unit: string;
//   image: string;
//   today: number;
//   yesterday: number;
//   lastWeek: number;
//   lastMonth: number;
//   change: {
//     dir: string;
//     pct: number;
//   };
//   markets: Market[];
// }

// const toBanglaNumber = (
//   number: number | string | null | undefined
// ): string => {
//   if (number === null || number === undefined) return "";

//   const banglaDigits = "০১২৩৪৫৬৭৮৯";

//   return number
//     .toString()
//     .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
// };

// const Page = async ({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) => {
//   const { id } = await params;

//   const res = await fetch(
//     `https://api.api-store.workers.dev/api/bazardor/products/${id}`
//   );

// if (!res.ok) {
//     throw new Error("পণ্যের তথ্য লোড করা যায়নি");
// }

// const data: Idatatype = await res.json();

// const markets = data.markets ?? [];

// const minPrice =
//     markets.length > 0
//         ? Math.min(...markets.map((market) => market.min))
//         : null;

// const maxPrice =
//     markets.length > 0
//         ? Math.max(...markets.map((market) => market.max))
//         : null;

// const averagePrice =
//     markets.length > 0
//         ? markets.reduce(
//             (total, market) => total + (market.min + market.max) / 2,
//             0
//         ) / markets.length
//         : null;

// return (
//     <div className="w-full max-w-5xl mx-auto px-4 py-6">
//         <div className="space-y-5">
//             {/* Product information */}
//             <div className="flex gap-4 items-center bg-[#FAFCFA] border border-gray-200 rounded-2xl p-5 sm:p-6">
//                 <p className="text-4xl">{data.image}</p>

//                 <div>
//                     <h1 className="text-2xl font-semibold">
//                         {data.nameBn}
//                     </h1>

//                     <p className="text-gray-600">
//                         প্রতি {data.unit} · {data.categoryNameBn}
//                     </p>

//                     {data.change.dir === "up" ? (
//                         <p className="text-red-600 mt-2">
//                             গতকালের তুলনায় আজ দাম বেড়েছে ·{" "}
//                             {toBanglaNumber(data.today - data.yesterday)} টাকা
//                         </p>
//                     ) : data.change.dir === "down" ? (
//                         <p className="text-green-600 mt-2">
//                             গতকালের তুলনায় আজ দাম কমেছে ·{" "}
//                             {toBanglaNumber(data.yesterday - data.today)} টাকা
//                         </p>
//                     ) : (
//                         <p className="text-gray-600 mt-2">
//                             দাম একই রয়েছে
//                         </p>
//                     )}
//                 </div>
//             </div>

//             {/* Price summary */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <div className="bg-white border border-gray-200 rounded-2xl p-5">
//                     <p className="text-gray-600">সর্বনিম্ন দাম</p>

//                     <p className="text-green-600 text-2xl font-semibold mt-2">
//                         {minPrice !== null
//                             ? `${toBanglaNumber(minPrice)} টাকা`
//                             : "তথ্য নেই"}
//                     </p>

//                     <p className="text-sm text-gray-500 mt-2">
//                         সবচেয়ে কম দামের বাজার
//                     </p>
//                 </div>

//                 <div className="bg-white border border-gray-200 rounded-2xl p-5">
//                     <p className="text-gray-600">সর্বাধিক দাম</p>

//                     <p className="text-red-600 text-2xl font-semibold mt-2">
//                         {maxPrice !== null
//                             ? `${toBanglaNumber(maxPrice)} টাকা`
//                             : "তথ্য নেই"}
//                     </p>

//                     <p className="text-sm text-gray-500 mt-2">
//                         সবচেয়ে বেশি দামের বাজার
//                     </p>
//                 </div>

//                 <div className="bg-white border border-gray-200 rounded-2xl p-5">
//                     <p className="text-gray-600">গড় দাম</p>

//                     <p className="text-blue-600 text-2xl font-semibold mt-2">
//                         {averagePrice !== null
//                             ? `${toBanglaNumber(
//                                 Number(averagePrice.toFixed(2))
//                             )} টাকা`
//                             : "তথ্য নেই"}
//                     </p>

//                     <p className="text-sm text-gray-500 mt-2">
//                         বাজারগুলোর গড় দাম
//                     </p>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// };

// export default Page;



import React from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  markets: Market[];
}

function toBanglaNumber(
  number: number | string | null | undefined
): string {
  if (number === null || number === undefined) {
    return "";
  }

  const banglaDigits = [
    "০", "১", "২", "৩", "৪",
    "৫", "৬", "৭", "৮", "৯",
  ];

  return number
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
}

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${id}`
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data: Idatatype = await res.json();

  const markets = data.markets ?? [];

  // সর্বনিম্ন দাম
  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : null;

  // সর্বাধিক দাম
  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : null;

  // সব বাজারের মধ্যবর্তী দামের গড়
  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : null;

  const priceChange = data.today - data.yesterday;

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-5">

      {/* Product Information */}
      <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[#FAFCFA] border border-gray-200 rounded-2xl p-5 sm:p-6">

        <div className="flex items-center justify-center bg-green-50 rounded-xl min-w-16 h-16 text-4xl">
          {data.image}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">
            {data.nameBn}
          </h1>

          <p className="text-gray-500 mt-1">
            প্রতি {data.unit === "kg" ? "কেজি" : data.unit} ·{" "}
            {data.categoryNameBn}
          </p>

          {data.change.dir === "up" ? (
            <p className="text-red-600 text-sm mt-3">
              গতকালের তুলনায় আজ দাম বেড়েছে ·{" "}
              {toBanglaNumber(Math.abs(priceChange))} টাকা
              {` (${toBanglaNumber(data.change.pct)}%)`}
            </p>
          ) : data.change.dir === "down" ? (
            <p className="text-green-600 text-sm mt-3">
              গতকালের তুলনায় আজ দাম কমেছে ·{" "}
              {toBanglaNumber(Math.abs(priceChange))} টাকা
              {` (${toBanglaNumber(data.change.pct)}%)`}
            </p>
          ) : (
            <p className="text-gray-600 text-sm mt-3">
              দাম একই রয়েছে
            </p>
          )}
        </div>

        <div className="bg-green-50 rounded-xl px-5 py-3 text-center">
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold text-green-700">
            {toBanglaNumber(data.today)} টাকা
          </p>
        </div>
      </section>

      {/* Price Summary */}
      <section className="bg-[#FAFCFA] border border-gray-200 rounded-2xl p-5 sm:p-6">

        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* Minimum Price */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              সর্বনিম্ন দাম
            </p>

            <p className="text-2xl font-bold text-green-600 mt-1">
              {minPrice !== null
                ? `${toBanglaNumber(minPrice)} টাকা`
                : "তথ্য নেই"}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* Maximum Price */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              সর্বাধিক দাম
            </p>

            <p className="text-2xl font-bold text-red-600 mt-1">
              {maxPrice !== null
                ? `${toBanglaNumber(maxPrice)} টাকা`
                : "তথ্য নেই"}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Average Price */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              গড় দাম
            </p>

            <p className="text-2xl font-bold text-green-600 mt-1">
              {averagePrice !== null
                ? `${toBanglaNumber(
                    Number(averagePrice.toFixed(2))
                  )} টাকা`
                : "তথ্য নেই"}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              বাজারগুলোর গড় দাম
            </p>
          </div>

        </div>
      </section>

      {/* Market-wise Price Table */}
      <section className="bg-[#FAFCFA] border border-gray-200 rounded-2xl p-5 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <span className="text-sm text-gray-500">
            মোট {toBanglaNumber(markets.length)}টি বাজার
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200">

          <table className="w-full min-w-[650px] text-sm text-left">

            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-4 font-semibold">
                  বাজার
                </th>

                <th className="px-4 py-4 font-semibold">
                  বিভাগ
                </th>

                <th className="px-4 py-4 font-semibold text-right">
                  সর্বনিম্ন
                </th>

                <th className="px-4 py-4 font-semibold text-right">
                  সর্বাধিক
                </th>

                <th className="px-4 py-4 font-semibold text-right">
                  গড়
                </th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market, index) => {
                const marketAverage =
                  (market.min + market.max) / 2;

                return (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-t border-gray-200 transition-colors hover:bg-green-50 ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-[#F0F5F0]"
                    }`}
                  >
                    <td className="px-4 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {market.market}
                    </td>

                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                      {market.division}
                    </td>

                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      {toBanglaNumber(market.min)} টাকা
                    </td>

                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      {toBanglaNumber(market.max)} টাকা
                    </td>

                    <td className="px-4 py-4 text-right font-semibold text-gray-800 whitespace-nowrap">
                      {toBanglaNumber(
                        Number(marketAverage.toFixed(2))
                      )} টাকা
                    </td>
                  </tr>
                );
              })}

              {markets.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    কোনো বাজারের তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          * প্রতিটি বাজারের গড় দাম সর্বনিম্ন ও সর্বাধিক
          দামের গড় থেকে হিসাব করা হয়েছে।
        </p>
      </section>

    </main>
  );
};

export default Page;
