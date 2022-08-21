import React from "react";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Workaround for tailwind */}
      <div
        className="bg-normal bg-fighting bg-flying bg-poison bg-ground bg-rock 
                   bg-bug bg-ghost bg-steel bg-fire bg-water bg-plant bg-electric
                   bg-psycho bg-ice bg-dragon bg-dark bg-fairy hidden"
      />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
