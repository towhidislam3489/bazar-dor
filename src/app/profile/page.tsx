

import React from 'react';
import { Metadata } from 'next';
import ProfilePage from './ProfileComp';


export const metadata: Metadata = {
    title: "আমার প্রোফাইল",
    description: "আমার প্রোফাইল",
};
const page = () => {
    return (
        <div>
            <ProfilePage></ProfilePage>
        </div>
    );
};

export default page;