import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { DefaultMenuItems } from "../../../../app/constants";
import { NavLink } from "react-router-dom";

const AppBarDesktopNav = () => {
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase
  ) as any;

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {firebaseSelector?.profile?.isEmpty === false && (
        <div className="flex mx-auto">
          {DefaultMenuItems.map((item, index) => (
            <Button
              key={`main-menu-item-${index}`}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "border-b-2 border-white" : ""}`
                }
                to={item.link}
              >
                {item.label}
              </NavLink>
            </Button>
          ))}
        </div>
      )}
    </Box>
  );
};

export default AppBarDesktopNav;
