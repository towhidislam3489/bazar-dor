
import Image from 'next/image';

import NavLogo from "../images2.png"
import DateTime from './DateTime';
import Link from 'next/link';

const NavBar = () => {

    return (
        <div>
            <div className=" mt-3">
                <div className="flex justify-around mb-5 items-center">
                    <div className="flex gap-2 items-center">
                        <div >
                            <Link href={'/'}><Image src={NavLogo} alt='NavLogo' height={100} width={100} className="h-12 w-12  bg-[#05893E] p-2 rounded-[10px] items-center"></Image></Link>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">বাজার দর</h1>
                            <div className="text-[15px]"><DateTime></DateTime></div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn ">সাইন ইন</button>
                        <button className="btn bg-[#05893E] text-white">সাইন আপ</button>
                    </div>
                </div>
                <hr className="border border-gray-300" />
            </div>

        </div>
    );
};

export default NavBar;