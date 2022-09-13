import React from 'react';
import { Capacitor } from '@capacitor/core';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import HandleBackButtonDialog from './native/handle-back-button';

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      {Capacitor.getPlatform() === 'android' && <HandleBackButtonDialog />}
      {/* Workaround for tailwind */}
      <div
        className="bg-normal bg-fighting bg-flying bg-poison bg-ground bg-rock
                   bg-bug bg-ghost bg-steel bg-fire bg-water bg-plant bg-electric
                   bg-psycho bg-ice bg-dragon bg-dark bg-fairy
                   text-red-500 text-green-500 text-blue-500 text-pink-500
                   text-yellow-500 text-orange-500
                   bg-red-500 bg-green-500 bg-blue-500 bg-pink-500
                   bg-yellow-500 bg-orange-500
                   w-1/12 w-2/12 w-3/12 w-4/12 w-5/12 w-6/12 w-7/12
                   w-8/12 w-9/12 w-10/12 w-11/12 hidden"
      />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
