'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        <button
          onClick={handleScrollToTop}
          type='button'
          className='fixed bottom-5 right-5 inline-flex items-center gap-x-2 rounded-md bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 '
        >
          Back to top
          <ArrowUpCircleIcon className='-mr-0.5 h-5 w-5' aria-hidden='true' />
        </button>
      )}
    </>
  );
}
