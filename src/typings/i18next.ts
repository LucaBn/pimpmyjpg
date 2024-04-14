import { defaultNS } from "@/i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: unknown;
  }
}

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

enum LanguageList {
  En = "en",
  Fr = "fr",
  It = "it",
  Ja = "ja",
}

export { LanguageList };
