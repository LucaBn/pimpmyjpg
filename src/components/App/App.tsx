import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Components
import Navbar from "@/components/UI/Organisms/Navbar/Navbar";
import Footer from "@/components/UI/Organisms/Footer/Footer";

// Providers
import { useBorders } from "../providers/BordersProvider";
import { useTheme } from "@/components/providers/ThemeProvider";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";
import { Themes } from "@/constants/themes";

const App: React.FC = () => {
  const { borders } = useBorders();
  const { theme } = useTheme();

  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const currentPathWithoutLang = pathname.split("/").slice(2).join("/");
    const previousPathWithoutLang = previousPathname.current
      .split("/")
      .slice(2)
      .join("/");

    if (currentPathWithoutLang !== previousPathWithoutLang) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    previousPathname.current = pathname;
  }, [pathname]);

  const textColorClass =
    theme === Themes.Dark ? `text-${Themes.Light}` : `text-${Themes.Dark}`;

  document.body.dataset.bsTheme = theme;
  document.body.dataset.bsBorders = borders;

  return (
    <div className={`${CLASS_APP_NAME} ${textColorClass}`}>
      <Navbar />
      <main
        className={`${CLASS_APP_NAME}-main bg-body-secondary ${textColorClass}`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
