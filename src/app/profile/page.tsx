'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast, Bounce } from 'react-toastify';

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    // সেশন থেকে ইউজার নেম লোড করা
    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    // প্রোফাইল নাম আপডেট হ্যান্ডলার
    const handleUpdateName = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            const { error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                toast.error(error.message || 'নাম আপডেট করতে সমস্যা হয়েছে!', {
                    position: "top-center",
                    transition: Bounce,
                });
            } else {
                toast.success('নাম সফলভাবে আপডেট করা হয়েছে!', {
                    position: "top-center",
                    transition: Bounce,
                });
            }
        } catch (err) {
            toast.error('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে!');
        } finally {
            setLoading(false);
        }
    };

    // সাইন আউট হ্যান্ডলার
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/signIn');
                },
            },
        });
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-[#f2f5f1] flex items-center justify-center text-gray-600">
                লোডিং হচ্ছে...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f2f5f1] flex justify-center py-12 px-4">
            <div className="w-full max-w-2xl space-y-6">
                
                {/* Header Section */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="text-sm text-gray-500 mt-0.5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>

                {/* Top User Info Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                            {session?.user?.image ? (
                                <Image 
                                    src={session.user.image} 
                                    alt={session.user.name || 'User Avatar'} 
                                    fill 
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xl">
                                    {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {session?.user?.name || 'Rezwan Ahmed'}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {session?.user?.email || 'rezwanahmed@gmail.com'}
                            </p>
                        </div>
                    </div>

                    {/* Sign Out Button */}
                    <button
                        onClick={handleSignOut}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-400 text-red-500 hover:bg-red-50 text-xs font-medium rounded-xl transition duration-150"
                    >
                        <span className="text-sm">↩</span> সাইন আউট
                    </button>
                </div>

                {/* Info & Edit Section */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">তথ্য</h3>

                    <form onSubmit={handleUpdateName} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                নাম
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-[#fafafa] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-sm text-gray-800 transition"
                                placeholder="আপনার নাম লিখুন"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#028643] hover:bg-[#027239] disabled:bg-emerald-300 text-white font-medium rounded-xl text-sm transition duration-150 shadow-sm"
                        >
                            {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}