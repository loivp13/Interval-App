import { themes } from "./index";

export const mapTheme = (variables) => {
  return {
    "--th-primary": variables.primary || "",
    "--th-secondary": variables.secondary || "",
    "--th-white": variables.white || "",
    "--th-linkText": variables.linkText || "",
    "--th-overlay": variables.overlay || "",
    "--th-shadow": variables.shadow || "",
    "--th-error": variables.error || "",
  };
};

export const applyTheme = (theme) => {
  const themeObject = mapTheme(themes[theme]);
  if (!themeObject) return;

  const root = document.documentElement;
  Object.keys(themeObject).forEach((property) => {
    if (property === "name") {
      return;
    }

    root.style.setProperty(property, themeObject[property]);
  });
};

export const extend = (extending, newTheme) => {
  return {
    ...extending,
    ...newTheme,
  };
};
