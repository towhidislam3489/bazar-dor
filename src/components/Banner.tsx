import React from 'react';
import DateTime from './DateTime';
import Image from 'next/image';

import BannerImage from '../bazar-hero.png'

const Banner = () => {
    return (
        <div className="flex items-center justify-between max-w-[70%] mx-auto  bg-[#FAFCFA] w-full px-7 rounded-2xl border border-gray-300">
            <div className="space-y-4 col-span-6 ">
                
                <button className="text-green-600 bg-green-200 px-3 rounded-[8px]"> <DateTime></DateTime></button>
                <h1 className="text-4xl">আজকের বাজারের দাম এক নজরে</h1>
                <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন- <br />
                    সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <a href="#all-products"><button className="btn bg-[#05893E] text-white">সব পণ্য দেখুন</button></a>
            </div>
            <div className="">
                <Image src={BannerImage} alt='Banner Image' height={1000} width={1000} className="h-80 w-80"></Image>
            </div>
        </div>
    );
};

export default Banner;