import { useState, useLayoutEffect } from "react";
import "./App.css";
import StudentLayout from "./layouts/StudentLayout";
import ViewPublic from "./routes/ViewPublic";
import AuthContext from "./contexts/AuthContext";
// import LibrarianLayout from "./layouts/LibrarianLayout";
import Auth from "./services/auth";
import Spinner from "./components/Spinner";
import LibrarianLayout from "./layouts/LibrarianLayout";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    const verifyToken = async () => {
      if (token) {
        const userData = await Auth.auth();
        if (userData.status) {
          setUser(userData);
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  let layouts;

  switch (user?.role) {
    case 1:
      layouts = <LibrarianLayout />;
      break;

    case 2:
      layouts = <StudentLayout />;
      break;

    default:
      layouts = <ViewPublic />;
      break;
  }
  return (
    <>
      <AuthContext.Provider value={{ setUser, setLoading, user }}>
        {loading ? <Spinner /> : layouts}
      </AuthContext.Provider>
    </>
  );
}

export default App;
