import React from 'react';

const AlertComponent = ({ text, gradient, height = 90 }) => {
  return (
    <div className={`flex flex-row justify-center items-center p-3 w-full h-[${height}px] bg-gradient-to-r ${gradient} rounded-xl text-slate-100 p-6 relative`}>
      <div className="absolute left-0 ml-5 w-[80px] p-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 32 32">
          <path fill="none" d="M16 8a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 13.875h-2.875v-8H13v2.25h1.875v5.75H12v2.25h8Z" />
          <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 6a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 16.125h-8v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z" />
        </svg>
      </div>
      <span className="p-3">
        {text}
      </span>
    </div>
  );
};

export default AlertComponent;
