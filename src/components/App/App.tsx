import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "@/components/UI/Organisms/Navbar/Navbar";
import Footer from "@/components/UI/Organisms/Footer/Footer";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";
import { Themes } from "@/constants/themes";

const App: React.FC = () => {
  const { theme } = useTheme();

  const textColorClass =
    theme === Themes.Dark ? `text-${Themes.Light}` : `text-${Themes.Dark}`;

  document.body.dataset.bsTheme = theme;

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
