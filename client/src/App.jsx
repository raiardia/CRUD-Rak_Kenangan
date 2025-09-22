import React from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      {/* <h1 class="text-3xl font-bold underline"> Hello world! </h1> */}
    </div>
  );
};

export default App; // <== WAJIB untuk diekspor
