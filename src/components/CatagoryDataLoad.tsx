import React from 'react';
import CatagorySection from './CatagorySection';

interface IDatatype{
    id: string,
    slug:string,
    nameBn: string,
    icon: string
}

const CatagoryDataLoad = async() => {
    const res=await fetch("https://api.api-store.workers.dev/api/bazardor/categories")
    const data:IDatatype[]=await res.json();
    return (
        <div>
           <CatagorySection props={data}></CatagorySection>
        </div>
    );
};

export default CatagoryDataLoad;