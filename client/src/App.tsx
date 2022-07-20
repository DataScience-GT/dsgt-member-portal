import React, { useEffect, useState } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//import pages
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Docs from "./Pages/Docs/Docs.lazy";
import Portal from "./Pages/Portal/Portal";
import { json } from "stream/consumers";

function App() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    //check if logged in --
    let session_key = localStorage.getItem("dsgt-portal-session-key");
    if (session_key) {
      //validate session
      const validateSession = async () => {
        await fetch("/api/session/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          body: JSON.stringify({ session_id: session_key }),
        }).then(async (res) => {
          const json = await res.json();
          console.log(json);
          if (!json.ok && json.error) {
            //error -- invalidate session
            localStorage.removeItem("dsgt-portal-session-key");
            setLoading(false);
          } else {
            //success -- allow movement to accessable pages
            setUserRole(json.role);

            if (
              window.location.pathname.toLowerCase() == "/login" ||
              window.location.pathname.toLowerCase() == "/signup"
            ) {
              window.location.href = "/portal";
            }
            setLoading(false);
          }
        });
      };

      validateSession().catch(console.error);
      //if so, move to portal home page
    } else {
      //if not, move to logged in page
      setLoading(false);
      if (
        window.location.pathname.toLowerCase() !== "/login" &&
        window.location.pathname.toLowerCase() !== "/signup" &&
        !window.location.pathname.toLowerCase().includes("/docs")
      ) {
        window.location.href = "/login";
      }
    }
  }, []);

  if (loading) {
    //make a nice loading page in the future
    return <div>loading...</div>;
  } else {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Docs/*" element={<Docs />} />
            {userRole === "member" ||
            userRole === "moderator" ||
            userRole === "administrator" ||
            userRole === "owner" ? (
              <Route path="/Portal" element={<Portal />} />
            ) : (
              ""
            )}
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
