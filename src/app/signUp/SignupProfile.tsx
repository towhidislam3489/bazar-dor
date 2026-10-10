'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';

export default function SignupForm() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        // পাসওয়ার্ড চেক
        if (password !== confirmPassword) {
            setErrorMsg('পাসওয়ার্ড দুটি মেলেনি!');
            return;
        }

        setLoading(true);

        try {
            // autoSignIn: false অপশন যুক্ত করা হয়েছে
            const { data: res, error } = await authClient.signUp.email({
                name,
                email,
                password,
            }, {
                
             
            });

            if (error) {
                setErrorMsg(error.message || 'সাইন আপ ব্যর্থ হয়েছে!');
                toast.error(error.message || 'সাইন আপ ব্যর্থ হয়েছে!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            } else {
                toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে লগইন করুন।', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });

                // নিরাপদ থাকার জন্য যদি আগে কোনো সেশন তৈরি হয়ে থাকে তা সাইন-আউট করে দিন
                await authClient.signOut();
                
                // সাইন-ইন/লগইন পেজে রিডাইরেক্ট করা হচ্ছে
                router.push("/signIn");
            }
        } catch (err: any) {
            setErrorMsg('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে!');
            toast.error('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে!');
        } finally {
            setLoading(false);
        }
    };

    // Social Auth Handlers
    const handleSocialSignUp = async (provider: 'google' | 'github') => {
        await authClient.signIn.social({
            provider,
            callbackURL: '/',
        });
    };

    return (
        <div className="min-h-screen bg-[#f1f5f0] flex flex-col items-center justify-center p-4">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-sm text-gray-600">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>

            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                {errorMsg && (
                    <div className="mb-4 p-3 text-xs text-red-700 bg-red-100 border border-red-200 rounded-lg">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                            minLength={8}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="আবার লিখুন"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#0d8239] hover:bg-[#0b6f30] disabled:bg-gray-400 text-white font-medium rounded-lg transition duration-200 text-sm shadow-sm"
                    >
                        {loading ? 'প্রসেসিং হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-gray-400">অথবা</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialSignUp('google')}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-xs font-medium text-gray-700"
                    >
                        <FcGoogle size={18} />
                        Google দিয়ে চালিয়ে যান
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialSignUp('github')}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-xs font-medium text-gray-700"
                    >
                        <FaGithub size={18} />
                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="text-center text-xs text-gray-600 mt-6">
                    অ্যাকাউন্ট আছে?{' '}
                    <Link href="/signin" className="text-[#0d8239] hover:underline font-medium">
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>

            <div className="mt-6">
                <Link href="/" className="text-xs text-gray-500 hover:text-gray-700">
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}
