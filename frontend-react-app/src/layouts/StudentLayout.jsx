import { useState, useContext } from "react";
import NavBar from "../components/NavBar";
import ViewStudent from "../routes/ViewStudent";
import AuthContext from "../contexts/AuthContext";

const StudentLayout = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(3);
  const { setUser } = useContext(AuthContext);
  const items = [
    { label: "Books", icon: "pi pi-fw pi-book", route: "/" },
    { label: "History", icon: "pi pi-fw pi-calendar", route: "/history" },
    {
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("token");
        setUser(null);
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
      <ViewStudent />
    </>
  );
};

export default StudentLayout;
