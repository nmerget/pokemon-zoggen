import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import { DefaultMenuItems } from "../../../app/constants";
import Loading from "../../loading";

const LoginButton = React.lazy(() => import("../../base/buttons/login"));

const LoginSection = () => {
  const navigate = useNavigate();
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase
  ) as any;

  useEffect(() => {
    if (firebaseSelector?.profile?.isEmpty === false) {
      navigate(DefaultMenuItems[0].link);
    }
  }, [navigate, firebaseSelector, DefaultMenuItems]);

  return (
    <aside className="p-12 sm:p-16 lg:p-24 h-full flex">
      <div className="max-w-xl mx-auto text-center">
        <p className="mt-2 text-3xl font-bold sm:text-5xl">
          Mach dich bereit für den Spaß mit deinen Freunden!
        </p>

        <div className="mt-8 sm:items-center sm:justify-center sm:flex">
          <Suspense fallback={<Loading/>}>
            <LoginButton contained={true} />
          </Suspense>
        </div>
      </div>
    </aside>
  );
};

export default LoginSection;
