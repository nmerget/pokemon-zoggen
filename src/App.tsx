import React from "react";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
