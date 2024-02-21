import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";

export default {
  plugins: [
    autoprefixer,
    purgecss({
      content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      safelist: [],
    }),
  ],
};
