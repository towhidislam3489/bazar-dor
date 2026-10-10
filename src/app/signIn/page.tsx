'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { redirect, useRouter } from 'next/navigation';

export default function SigninForm() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;


        const { data, error } = await authClient.signIn.email({
            email,
            password,
           
        });

        if (error) {
            setErrorMsg(error.message || 'সাইন ইন ব্যর্থ হয়েছে। সঠিক ইমেইল ও পাসওয়ার্ড দিন।');
        } else {
            redirect('/');
            
        }

    };

    // Social Sign-in Handler
    const handleSocialSignIn = async (provider: 'google' | 'github') => {
        await authClient.signIn.social({
            provider,
            callbackURL: '/',
        });
    };

    return (
        <div className="min-h-screen bg-[#f1f5f0] flex flex-col items-center justify-center p-4">
            {/* Top Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">সাইন ইন</h1>
                <p className="text-sm text-gray-600">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>

            {/* Card Container */}
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                {/* Error Alert */}
                {errorMsg && (
                    <div className="mb-4 p-3 text-xs text-red-700 bg-red-100 border border-red-200 rounded-lg">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#0d8239] hover:bg-[#0b6f30] disabled:bg-gray-400 text-white font-medium rounded-lg transition duration-200 text-sm shadow-sm"
                    >
                        {loading ? 'লগইন করা হচ্ছে...' : 'সাইন ইন'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-gray-400">অথবা</span>
                    </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn('google')}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-xs font-medium text-gray-700"
                    >
                        <FcGoogle size={18} />
                        Google দিয়ে চালিয়ে যান
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn('github')}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-xs font-medium text-gray-700"
                    >
                        <FaGithub size={18} />
                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                {/* Signup Link */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link href="/signup" className="text-[#0d8239] hover:underline font-medium">
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>

            {/* Bottom Back Link */}
            <div className="mt-6">
                <Link href="/" className="text-xs text-gray-500 hover:text-gray-700">
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}