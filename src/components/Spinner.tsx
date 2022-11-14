import React from 'react';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-block animate-wiggle rounded-full border-2 border-slate-500 p-1"
        role="status"
      >
        <span className="text-bold">Loading...</span>
      </div>
    </div>
  );
}
