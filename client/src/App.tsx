import React, { useEffect, useState } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Theme, ThemeContext } from "./Context/ThemeContext";

import { getRoleValue, Role } from "./Scripts/RoleManagement";

// Import pages
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Docs from "./Pages/Docs/Docs.lazy";
import Portal from "./Pages/Portal/Portal";
import Loader from "./components/Loader/Loader";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Register from "./Pages/Register/Register";

function App() {
  // Themes -> context
  const [theme, setTheme] = useState(Theme.Dark);

  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  // const [path, setPath] = useState("");

  useEffect(() => {
    // Retrieves theme from local storage
    let theme_stored = localStorage.getItem("dsgt-portal-theme");
    if (theme_stored) {
      setTheme(theme_stored as Theme);
    } else {
      setTheme(Theme.Dark);
      localStorage.setItem("dsgt-portal-theme", Theme.Dark);
    }

    // Check if logged in --
    let session_key = localStorage.getItem("dsgt-portal-session-key");
    if (session_key) {
      // Validate session
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

          if ((!json.ok && json.error) || !json.valid) {
            // Error -- invalidate session
            // setPath(window.location.pathname.toLowerCase());
            localStorage.removeItem("dsgt-portal-session-key");
            // Sends you to login page after session expiration
            window.location.href = `/login?re=${window.location.pathname}`;
          } else {
            // Success -- allow movement to pages
            setUserRole(json.role);
            localStorage.setItem("dsgt-portal-fname", json.fname);
            localStorage.setItem("dsgt-portal-role", json.role);
            if (
              window.location.pathname.toLowerCase() === "/login" ||
              window.location.pathname.toLowerCase() === "/signup" ||
              window.location.pathname.toLowerCase() === "/register" ||
              window.location.pathname.toLowerCase() === "/"
            ) {
              window.location.href = "/portal";
            }
            setLoading(false);
          }
        });
      };
      validateSession().catch(console.error);
      // If so, move to portal home page
    } else {
      // If not, move to logged in page
      setLoading(false);
      if (
        window.location.pathname.toLowerCase() !== "/login" &&
        window.location.pathname.toLowerCase() !== "/signup" &&
        window.location.pathname.toLowerCase() !== "/register" &&
        !window.location.pathname.toLowerCase().includes("/docs") &&
        !window.location.pathname.toLowerCase().includes("/passwordreset")
      ) {
        window.location.href = "/login";
      }
    }
  }, []);

  if (loading) {
    // Make a nice loading page in the future
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Loader height="100vh" />
      </ThemeContext.Provider>
    );
  } else {
    return (
      <div className={`App ${theme}`}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Router>
            <Routes>
              <Route path="/*" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Passwordreset/*" element={<ResetPassword />} />
              <Route path="/Docs/*" element={<Docs />} />
              {getRoleValue(userRole as Role) >= 0 ? (
                <Route path="/Portal/*" element={<Portal role={userRole} />} />
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
