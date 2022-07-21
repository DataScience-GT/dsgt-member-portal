import React, { useEffect, useState } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Theme, ThemeContext } from "./Context/ThemeContext";

//import pages
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Docs from "./Pages/Docs/Docs.lazy";
import Portal from "./Pages/Portal/Portal";

function App() {
  //theme -- use for context
  const [theme, setTheme] = useState(Theme.Light);

  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    //check for theme
    let theme_stored = localStorage.getItem("dsgt-portal-theme");
    switch (theme_stored) {
      case "Light":
        setTheme(Theme.Light);
        break;
      case "Dark":
        setTheme(Theme.Dark);
        break;
      case "Black":
        setTheme(Theme.Black);
        break;
      default:
        setTheme(Theme.Dark);
        localStorage.setItem("dsgt-portal-theme", Theme.Dark);
        break;
    }
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
              window.location.pathname.toLowerCase() == "/signup" ||
              window.location.pathname.toLowerCase() == "/"
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
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Router>
            <Routes>
              {/* <Route path="/*" element={<Login />} /> */}
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Docs/*" element={<Docs />} />
              {userRole === "member" ||
              userRole === "moderator" ||
              userRole === "administrator" ||
              userRole === "owner" ? (
                <Route path="/Portal/*" element={<Portal />} />
              ) : (
                ""
              )}
            </Routes>
          </Router>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
