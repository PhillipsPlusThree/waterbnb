import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default {
  server: {
    proxy: {
      "/api": `https://waterbnb-api.onrender.com`,
    },
  },
  cacheDir: "../node_modules/.vite",
};
