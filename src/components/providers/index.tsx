// Providers
import { BordersProvider } from "@/components/providers/BordersProvider/BordersProvider";
import { ReactRouterProvider } from "@/components/providers/ReactRouterProvider/ReactRouterProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider/ThemeProvider";

export const Providers = () => {
  return (
    <ThemeProvider>
      <BordersProvider>
        <ReactRouterProvider />
      </BordersProvider>
    </ThemeProvider>
  );
};
