import { Metadata } from 'next';
import React from 'react';
import SignupForm from './SignupProfile';

export const metadata: Metadata = {
    title: "সাইন আপ",
    description: "সাইন আপ",
};

const page = () => {
    return (
        <div>
            <SignupForm></SignupForm>
        </div>
    );
};

export default page;