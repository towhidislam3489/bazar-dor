'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';


export default function SignupForm() {
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

        // পাসওয়ার্ড নিশ্চিতকরণের পরীক্ষা
        if (password !== confirmPassword) {
            setErrorMsg('পাসওয়ার্ড দুটি মেলেনি!');
            return;
        }

        setLoading(true);

        
            const { data: res, error } = await authClient.signUp.email({
                name,
                email,
                password,

            });
            console.log(res,error)

            if (error) {
                setErrorMsg(error.message || 'সাইন আপ ব্যর্থ হয়েছে!');
            } else {
                redirect("/")

            }
        
      
    };

    // Social Auth Handlers
    const handleSocialSignUp = async (provider: 'google' | 'github') => {
        await authClient.signIn.social({
            provider,
            callbackURL: '/dashboard',
        });
    };

    return (
        <div className="min-h-screen bg-[#f1f5f0] flex flex-col items-center justify-center p-4">
            {/* Top Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-sm text-gray-600">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
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
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                        <input
                            name="name" // <-- যুক্ত করা হয়েছে
                            type="text"
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                        <input
                            name="email" // <-- যুক্ত করা হয়েছে
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
                            name="password" // <-- যুক্ত করা হয়েছে
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                            minLength={8}
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input
                            name="confirmPassword" // <-- যুক্ত করা হয়েছে
                            type="password"
                            placeholder="আবার লিখুন"
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
                        {loading ? 'প্রসেস করা হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
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

                {/* Login Link */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    অ্যাকাউন্ট আছে?{' '}
                    <Link href="/signin" className="text-[#0d8239] hover:underline font-medium">
                        সাইন ইন করুন
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




// "use client";


// import { authClient } from "@/lib/auth-client";
// import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

// export default function page() {
//     const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const data: Record<string, string> = {};

//         // Convert FormData to plain object
//         formData.forEach((value, key) => {
//             data[key] = value.toString();
//         });

//         const { data:resdata, error } = await authClient.signUp.email({
//             name: "Towhid", // required, The name of the user.
//             email: data.email, // required, The email address of the user.
//             password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
//             image: "https://example.com/image.png", // An optional profile image of the user.
         
//         });
//         console.log(resdata,error)

//         alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
//     };

//     return (
//         <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
//             <TextField
//                 isRequired
//                 name="email"
//                 type="email"
//                 validate={(value) => {
//                     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//                         return "Please enter a valid email address";
//                     }

//                     return null;
//                 }}
//             >
//                 <Label>Email</Label>
//                 <Input placeholder="john@example.com" />
//                 <FieldError />
//             </TextField>

//             <TextField
//                 isRequired
//                 minLength={8}
//                 name="password"
//                 type="password"
//                 validate={(value) => {
//                     if (value.length < 8) {
//                         return "Password must be at least 8 characters";
//                     }
//                     if (!/[A-Z]/.test(value)) {
//                         return "Password must contain at least one uppercase letter";
//                     }
//                     if (!/[0-9]/.test(value)) {
//                         return "Password must contain at least one number";
//                     }

//                     return null;
//                 }}
//             >
//                 <Label>Password</Label>
//                 <Input placeholder="Enter your password" />
//                 <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
//                 <FieldError />
//             </TextField>

//             <div className="flex gap-2">
//                 <Button type="submit">
                  
//                     Submit
//                 </Button>
//                 <Button type="reset" variant="secondary">
//                     Reset
//                 </Button>
//             </div>
//         </Form>
//     );
// }