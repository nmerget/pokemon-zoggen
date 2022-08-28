import * as React from 'react';

function Loading() {
  return (
    <div className="flex w-full h-full">
      <div className="m-auto flex flex-col">
        <img
          className="w-24 h-24 animate-spin m-auto"
          alt="Logo"
          src="/logo512.webp"
        />

        <span className="text-3xl mt-16 mx-auto animate-pulse">
          Lädt Daten...
        </span>
      </div>
    </div>
  );
}

export default Loading;
