import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.error('[NESS] Starting application...');

const rootElement = document.getElementById("root");
console.error('[NESS] Root element:', rootElement);

if (rootElement) {
  console.error('[NESS] Creating React root...');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.error('[NESS] React app rendered');
} else {
  console.error('[NESS] ERROR: Root element not found!');
}
