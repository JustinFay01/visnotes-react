import { useEffect } from "react";

function useDynamicIcon() {
  useEffect(() => {
    const darkIcon = "/favicon-dark.ico";
    const lightIcon = "/favicon-light.ico";

    const updateFavicon = (e: MediaQueryListEvent) => {
      const theme = e.matches ? "dark" : "light";
      updateIcon(theme);
    };

    const updateIcon = (theme: "light" | "dark") => {
      let link: HTMLLinkElement | null =
        document.querySelector("link[rel~='icon']");

      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }

      link.href = theme === "dark" ? darkIcon : lightIcon;
    };

    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    updateFavicon({ matches: isDarkMode.matches } as MediaQueryListEvent);

    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDarkMode.addEventListener("change", updateFavicon);

    return () => {
      prefersDarkMode.removeEventListener("change", updateFavicon);
    };
  }, []);
}

export default useDynamicIcon;
