import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { Button } from "@mui/material";
import { LoginButtonType } from "./data";
import LoginDialog from "../../login-dialog";

const LoginButton = ({ contained }: LoginButtonType) => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase
  ) as any;

  return (
    <>
      <LoginDialog open={popupOpen} handleClose={() => setPopupOpen(false)} />
      {(!firebaseSelector.profile || firebaseSelector.profile.isEmpty) && (
        <Button
          color={contained ? "primary" : "inherit"}
          variant={contained ? "contained" : "text"}
          onClick={() => setPopupOpen(true)}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default LoginButton;
