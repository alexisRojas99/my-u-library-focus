import React, { useState, useContext } from "react";
import NavBar from "../components/NavBar";
import ViewLibrarian from "../routes/ViewLibrarian";
import AuthContext from "../contexts/AuthContext";

const LibrarianLayout = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(3);
  const { user, setUser } = useContext(AuthContext);
  const items = [
    { label: "Create user", icon: "pi pi-fw pi-user-plus", route: "/" },
    { label: "Create book", icon: "pi pi-fw pi-book", route: "/create-book" },
    { label: "Receive book ", icon: "pi pi-fw pi-align-left", route: "/receive-book" },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
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
      <center><h4>Librarian / username: {user.email}</h4></center>
      <ViewLibrarian />
    </>
  );
};

export default LibrarianLayout;
