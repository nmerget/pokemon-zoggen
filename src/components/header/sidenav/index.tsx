import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../../features/local/localSlice";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../app/store";
import { DefaultMenuItems } from "../../../app/constants";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import AppBarUserMenu from "../app-bar/user-menu";

const SideNav = () => {
  const dispatch = useDispatch();

  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase
  ) as any;
  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={true}
        onClose={() => dispatch(toggleMenu())}
        onOpen={() => {}}
      >
        <Box sx={{ width: "75vw" }} role="presentation">
          <div className="h-14 p-4 flex justify-between items-center">
            <span className="text-gray-700 text-xl font-bold">Menü</span>
            <AppBarUserMenu contained={true} />
          </div>
          <Divider />
          <List>
            {firebaseSelector?.profile?.isEmpty === false &&
              DefaultMenuItems.map((item, index) => (
                <ListItem key={`sidenav-menu-item-${index}`}>
                  <ListItemButton>
                    <NavLink
                      className={({ isActive }) =>
                        `${isActive ? "border-b-2 border-blue-600" : ""}`
                      }
                      to={item.link}
                    >
                      <ListItemText>{item.label}</ListItemText>
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default SideNav;
