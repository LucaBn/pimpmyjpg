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

export enum LanguageList {
  En = "en",
  It = "it",
  Ja = "ja",
}
