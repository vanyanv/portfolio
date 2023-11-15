import Link from 'next/link';
import React from 'react';

export default function HomeButton() {
  return (
    <div>
      <button
        type='button'
        className='fixed bottom-5 right-5 inline-flex items-center gap-x-2 rounded-md bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 '
      >
        Home
      </button>
    </div>
  );
}
