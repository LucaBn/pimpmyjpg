import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "@/components/UI/Organisms/Navbar/Navbar";

// Providers
import { useTheme } from "@/components/providers/ThemeProvider/ThemeProvider";

// Constants
import { CLASS_APP_NAME } from "@/constants/html-classes";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={CLASS_APP_NAME}
      data-bs-theme={theme}
      data-testid="vitest-app"
    >
      <Navbar />
      <main className={`${CLASS_APP_NAME}-main bg-body-secondary`}>
        <h1>👷‍♂️ WORK IN PROGRESS 👷‍♂️</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
