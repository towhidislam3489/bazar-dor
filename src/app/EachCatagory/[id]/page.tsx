import React from 'react';

const page = async ({ params }: {
    params: Promise<{
        slug: string;
    }>
}) => {
    const {id}=await params;
    return (
        <div>
            {id};
        </div>
    );
};

export default page;