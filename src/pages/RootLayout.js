import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Navigation } from "../components";

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
