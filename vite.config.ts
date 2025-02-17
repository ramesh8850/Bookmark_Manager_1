import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: "0.0.0.0", // Allows external access
    port: 5173, // Ensure this matches your CodeSandbox port
    strictPort: true,
    allowedHosts: ["fcl86r-5173.csb.app"], // Allow your sandbox URL
    cors: true, // Enable CORS if needed
  },
});
