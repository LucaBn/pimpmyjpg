import { LanguageList } from "@/typings/i18next";

const DEFAULT_LANGUAGE: LanguageList = LanguageList.En;

const DECIMAL_SEPARATOR = {
  [LanguageList.En]: ".",
  [LanguageList.Fr]: ",",
  [LanguageList.It]: ",",
  [LanguageList.Ja]: ".",
};

export { DEFAULT_LANGUAGE, DECIMAL_SEPARATOR };
