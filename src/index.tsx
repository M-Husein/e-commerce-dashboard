// import { Suspense } from "react"; // StrictMode
import { createRoot } from "react-dom/client";
import { App } from "./App";
// import { LoaderApp } from '@/components/LoaderApp';

import './i18n'; // locale

// import "@refinedev/antd/dist/reset.css";
import "./style/style.scss";

createRoot(document.getElementById("app") as HTMLElement)
  .render(
    <App />
  );

/*
<Suspense 
  // fallback={<LoaderApp />}
  fallback=""
>
  <App />
</Suspense>
*/

/*
<StrictMode>
  <App />
</StrictMode>
*/
