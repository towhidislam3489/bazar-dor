
'use client'

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const NavButton = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/'); // সাইন আউট হওয়ার পর সাইন ইন পেজে পাঠিয়ে দিবে
                    router.refresh();      // সেশন ক্যাশ ক্লিয়ার করে স্টেট রিফ্রেশ করবে
                },
            },
        });
    };

    return (
        <div>
            {isPending ? (
                <div className="flex justify-center items-center min-h-[30px] w-full">
                    <span className="loading loading-spinner text-success"></span>
                </div>
            ) : session?.user ? (
                <div className="flex items-center gap-3">
                    <span>Welcome, {session.user.name}</span>
                    <button className="btn bg-red-500 text-white" onClick={handleSignOut}>
                        Sign out
                    </button>
                </div>
            ) : (
                <div className="flex gap-3">
                    <Link href="/signIn" className="btn">
                        সাইন ইন
                    </Link>
                    <Link href="/signUp" className="btn bg-[#05893E] text-white hover:bg-[#046e31]">
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavButton;