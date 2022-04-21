import { useState, useEffect } from "react";
import "./App.css";
import StudentLayout from "./layouts/StudentLayout";
import ViewPublic from "./routes/ViewPublic";
import AuthContext from "./contexts/AuthContext";
import LibrarianLayout from "./layouts/LibrarianLayout";
import Auth from "./services/auth";
import Spinner from "./components/Spinner";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await Auth.auth();
        setUser(userData);
        setLoading(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ setUser, setLoading }}>
        {loading ? (
          <Spinner />
        ) : !user ? (
          <ViewPublic />
        ) : (
          user.role === 2 && <StudentLayout />
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
