// Providers
import { BordersProvider } from "@/components/providers/BordersProvider/BordersProvider";
import { ReactRouterProvider } from "@/components/providers/ReactRouterProvider/ReactRouterProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider/ThemeProvider";
import { UsageCounterProvider } from "@/components/providers/UsageCounterProvider/UsageCounterProvider";

export const Providers = () => {
  return (
    <ThemeProvider>
      <BordersProvider>
        <UsageCounterProvider>
          <ReactRouterProvider />
        </UsageCounterProvider>
      </BordersProvider>
    </ThemeProvider>
  );
};
