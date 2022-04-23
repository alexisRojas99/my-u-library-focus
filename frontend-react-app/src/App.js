import { useState, useEffect } from "react";
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
  const [token] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        const userData = await Auth.auth();
        if (userData.status) {
          setUser(userData);
        }
        setLoading(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);
  console.log(user);
  return (
    <>
      <AuthContext.Provider value={{ setUser, setLoading, user }}>
        {loading ? (
          <Spinner />
        ) : !user ? (
          <ViewPublic />
        ) : user.role === 2 ? (
          <StudentLayout />
        ) : loading ? (
          <Spinner />
        ) : (
          user.role === 1 && <LibrarianLayout />
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
