import React from "react";
import { TabMenu } from "primereact/tabmenu";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = ({ items, setActiveIndex, activeIndex }) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="card">
          <TabMenu
            model={items}
            onTabChange={({ value: { route, onClick} }) => route?navigate(route):onClick()}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
