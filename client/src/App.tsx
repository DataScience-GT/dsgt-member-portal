import React, { useEffect } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//import pages
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Docs from "./Pages/Docs/Docs.lazy";
import Portal from "./Pages/Portal/Portal";
import { json } from "stream/consumers";

function App() {
  useEffect(() => {
    //check if logged in --
    let session_key = localStorage.getItem("dsgt-portal-session-key");
    if (session_key) {
      //validate session
      console.log("validate");
      const validateSession = async () => {
        await fetch("/api/session/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          body: JSON.stringify({ session_key: session_key }),
        }).then(async (res) => {
          // const json = await res.json();
          // if (!json.ok && json.error) {
          //   //error -- invalidate session
          //   localStorage.removeItem("dsgt-portal-session-key");
          // } else {
          //   //save session key to localstorage
          //   console.log("validate success");
          // }
          console.log(await res.text());
        });
      };

      validateSession().catch(console.error);
      //if so, move to portal home page
    } else {
      //if not, move to logged in page
      if (
        window.location.pathname.toLowerCase() !== "/login" &&
        window.location.pathname.toLowerCase() !== "/signup" &&
        !window.location.pathname.toLowerCase().includes("/docs")
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
          <Route path="/Portal" element={<Portal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
