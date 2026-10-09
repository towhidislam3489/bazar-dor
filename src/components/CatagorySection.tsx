'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';


interface IDatatype{
    id: string,
    slug:string,
    nameBn: string,
    icon: string
}

const CatagorySection = ({props}:{props:IDatatype[]}) => {
    const pathname=usePathname();
    const data:IDatatype[]=props
    console.log(pathname)
    return (
        <div className="flex md:gap-3 md:max-w-[70%] mx-auto mt-3">
            {data.map((v,id)=> <span key={id} className={`${pathname===`/EachCatagory/${v.slug}` ? "bg-[#05893E] text-white rounded-[5px]": " "} px-0.5 md:px-3 md:py-2`}> <Link href={`/EachCatagory/${v.slug}`} >{v.icon} {v.nameBn}</Link> </span>)}
        </div>
    );
};

export default CatagorySection;