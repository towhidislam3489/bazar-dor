import { Metadata } from 'next';
import React from 'react';
import SigninForm from './SigninPage';

export const metadata: Metadata = {
    title: "সাইন ইন",
    description: "সাইন ইন",
};

const page = () => {
    return (
        <div>
            <SigninForm></SigninForm>
        </div>
    );
};

export default page;