import Link from "next/link";
import { Metadata } from "next";

// পেজের টাইটেল এবং মেটাডাটা (SEO এর জন্য)
export const metadata: Metadata = {
  title: "পেজটি খুঁজে পাওয়া যায়নি | ৪০৪",
  description: "দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-lg w-full text-center">
        
        {/* 404 Graphic / Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-12 h-12"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          কোনো আইটেম পাওয়া যায়নি!
        </h2>
        <p className="text-gray-500 mb-8 text-base md:text-lg">
          দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি হয়তো নেই অথবা লিংকটি ভুল। অনুগ্রহ করে হোম পেজে ফিরে যান।
        </p>

        {/* CTA Button linking back to / */}
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-green-600 hover:bg-green-800 text-white font-medium py-3 px-8 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            stroke="currentColor" 
            className="w-5 h-5 mr-2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
            />
          </svg>
          হোম পেজে ফিরে যান
        </Link>

      </div>
    </div>
  );
}