import { useState, useContext } from "react";
import NavBar from "../components/NavBar";
import ViewStudent from "../routes/ViewStudent";
import AuthContext from "../contexts/AuthContext";

const StudentLayout = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(3);
  const { user, setUser } = useContext(AuthContext);
  const items = [
    { label: "Reserve books", icon: "pi pi-fw pi-book", route: "/" },
    { label: "My Books Records", icon: "pi pi-fw pi-history", route: "/history" },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      onClick: () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.replace("/");
      },
    },
  ];
  return (
    <>
      <NavBar
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        items={items}
      />
      <center>
        <h4>Student / username: {user.email}</h4>
      </center>
      <ViewStudent />
    </>
  );
};

export default StudentLayout;
