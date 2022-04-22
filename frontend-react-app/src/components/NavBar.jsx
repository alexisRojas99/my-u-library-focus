import React, { useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import "./NavBar.css";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ items, setActiveIndex, activeIndex }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const matchPathname = items.findIndex((element) => element.route === location.pathname);
    setActiveIndex(matchPathname);
  });
  return (
    <>
      <div>
        <div className="card">
          <TabMenu
            model={items}
            onTabChange={({ value: { route, onClick }, index }) => {
              route ? navigate(route) : onClick();
              setActiveIndex(index);
            }}
            activeIndex={activeIndex}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
