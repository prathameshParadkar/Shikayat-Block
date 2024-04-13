import React from "react";
// import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store.js";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import hiTranslations from "./locales/hi.json";
import { theme } from "./theme";

// ReactDOM.render(
//   <ChakraProvider>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </ChakraProvider>,
//   document.getElementById("root")
// );

import ReactDOM from "react-dom/client";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    hi: { translation: hiTranslations },
  },
  // lng: "hi", // Set the default language to English
  lng: "en", // Set the default language to English
  fallbackLng: "en", // Fallback language if translation not found for a specific key
  interpolation: { escapeValue: false }, // React already does escaping
});

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </ChakraProvider>
);
