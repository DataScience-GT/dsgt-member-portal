import React, { useEffect } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//import pages
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Docs from "./Pages/Docs/Docs.lazy";

function App() {
  useEffect(() => {
    //check if logged in --
    let session_key = localStorage.getItem("dsgt-portal-session-key");
    if (session_key) {
      //validate session
      //if so, move to portal home page
    } else {
      //if not, move to logged in page
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Docs/*" element={<Docs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
