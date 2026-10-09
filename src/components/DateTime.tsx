'use client';

import { useState, useEffect } from 'react';

const DateTime = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const banglaDate = new Date().toLocaleDateString('bn-BD', {
      dateStyle: 'full',
    });
    setDate(banglaDate);
  }, []);

  return <div>{date}</div>;
};

export default DateTime;