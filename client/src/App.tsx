import React from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//import pages
import Signup from "./Pages/Signup/Signup";
import Docs from "./Pages/Docs/Docs.lazy";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Signup />} />
          <Route path="/Docs" element={<Docs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
