import type { PropsWithChildren } from "react";
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useGetLocale } from "@refinedev/core";
import { ConfigProvider, App as AntdApp, theme as AntdTheme } from "antd";
import dayjs from 'dayjs';
import enUS from 'antd/locale/en_US';
import idID from 'antd/locale/id_ID';
import 'dayjs/locale/en';

const currentLang = localStorage.getItem("i18nextLng") || 'en';

dayjs.locale(currentLang); // Initial value for locale date

/** @OPTION : For toggle color scheme */
const toggleTheme = (isDark: boolean) => {
  let html = document.documentElement;
  html.classList.toggle("dark", isDark);
  let metaTheme = html.querySelector('meta[name=theme-color]') as any;
  if(metaTheme){
    metaTheme.content = getComputedStyle(html).getPropertyValue('--q-bg-nav');
  }
}

const AntLanguages: { [key: string]: any } = {
  id: idID,
  en: enUS,
};

type AppContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useApp = () => {
  return useContext(AppContext);
}

export const AppLocale = ({ children }: PropsWithChildren) => {
  const locale = useGetLocale();
  const currentLocale = locale();

  return (
    <ConfigProvider
      locale={AntLanguages[currentLocale || currentLang]}
    >
      {children}
    </ConfigProvider>
  );
}

// const isSystemPreferenceDark = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const themeLocalStorage = localStorage.getItem("theme");

export const AppContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [theme, setTheme] = useState(themeLocalStorage || "light"); //  || systemPreference

  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("theme", theme);
    toggleTheme(theme === "dark");
  }, [theme]);

  const setColorMode = () => {
    setTheme(isDark ? "light" : "dark");
  }

  const value = useMemo(() => ({ theme, setTheme: setColorMode }), [theme]);

  return (
    <AppContext.Provider
      value={value}
    >
      <ConfigProvider 
        // wave={{
        //   disabled: true,
        // }}
        prefixCls="a" // Default = "ant" (NOTE: Change in scss / css files too)
        iconPrefixCls="ai" // Default = "anticon" (NOTE: Change in scss / css files too)
        // componentDisabled={true} // For disabled components: Button, Input, Checkbox, Dropdown Button, 
        theme={{
          algorithm: isDark ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm,
          token: {
            // fontFamily: "'Lato',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
            // fontSize: 14,
            // lineHeight: 1.6, // default: 1.5714285714285714,
            // colorText: "",
            // colorLink: "#ff7a00",
            colorPrimary: "#0d6efd",
            zIndexPopupBase: 1055, // For Modal
          },
          components: {
            Button: {
              fontWeight: 600,
            },
            Menu: {
              algorithm: true, // Enable algorithm
              itemPaddingInline: 9, // Default: 16
            },
            Notification: {
              zIndexPopup: 2056, // 1060
            },
            Table: {
              cellPaddingBlockSM: 5,
            },
          },
        }}
      >
        <AntdApp
          notification={{ bottom: 0 }}
        >
          {children}
        </AntdApp>
      </ConfigProvider>
    </AppContext.Provider>
  );
}
