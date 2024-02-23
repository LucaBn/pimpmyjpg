import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Components
import Navbar from "@/components/UI/Organisms/Navbar/Navbar";
import Footer from "@/components/UI/Organisms/Footer/Footer";

// Providers
import { useBorders } from "@/components/providers/BordersProvider";
import { useTheme } from "@/components/providers/ThemeProvider";

// Locales
import { useTranslation } from "react-i18next";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";
import { DEFAULT_LANGUAGE } from "@/constants/languages";
import { ThemeList } from "@/constants/themes";

const App: React.FC = () => {
  const { borders } = useBorders();
  const { theme } = useTheme();

  const { i18n } = useTranslation();
  const { language, changeLanguage } = i18n;

  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      if (language) {
        const newLocation = `/${language}`;
        navigate(newLocation);
      } else {
        const newLocation = `/${DEFAULT_LANGUAGE}`;
        changeLanguage(DEFAULT_LANGUAGE);
        navigate(newLocation);
      }
    }
  }, []);

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
    theme === ThemeList.Dark
      ? `text-${ThemeList.Light}`
      : `text-${ThemeList.Dark}`;

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
