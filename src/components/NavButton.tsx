'use client'

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const NavButton = () => {
    const { data: session, isPending } = authClient.useSession()
    console.log(session);
    return (
        <div>
            {isPending ? <div className="flex justify-center items-center min-h-[30px] w-full "><span className="loading loading-spinner text-success"></span></div> : session?.user ? <div>Welcome {session.user.name}</div> : <div className="flex gap-3">
                <button className="btn ">সাইন ইন</button>
                <button className="btn bg-[#05893E] text-white" > <Link href={'/signUp'}>সাইন আপ</Link> </button>
            </div>}
        </div>
    );
};

export default NavButton;