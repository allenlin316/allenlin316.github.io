/* Shared Tailwind (Play CDN) configuration for every page.
   Load order in each page's <head>:
     1. /style/tokens.css   (CSS custom properties, light + dark)
     2. https://cdn.tailwindcss.com?plugins=forms,container-queries
     3. /script/tailwind-config.js  (this file)
   Colors resolve through the tokens so html.dark flips the whole palette
   and opacity modifiers (bg-secondary/10) keep working. */

(function () {
  var t = function (name) { return "rgb(var(--c-" + name + ") / <alpha-value>)"; };

  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          background: t("background"),
          "on-background": t("on-background"),
          surface: t("surface"),
          "surface-dim": t("surface-dim"),
          "surface-bright": t("surface-bright"),
          "surface-container-lowest": t("surface-container-lowest"),
          "surface-container-low": t("surface-container-low"),
          "surface-container": t("surface-container"),
          "surface-container-high": t("surface-container-high"),
          "surface-container-highest": t("surface-container-highest"),
          "surface-variant": t("surface-variant"),
          "on-surface": t("on-surface"),
          "on-surface-variant": t("on-surface-variant"),
          "inverse-surface": t("inverse-surface"),
          "inverse-on-surface": t("inverse-on-surface"),
          outline: t("outline"),
          "outline-variant": t("outline-variant"),
          "surface-tint": t("surface-tint"),
          primary: t("primary"),
          "on-primary": t("on-primary"),
          "primary-container": t("primary-container"),
          "on-primary-container": t("on-primary-container"),
          "inverse-primary": t("inverse-primary"),
          secondary: t("secondary"),
          "on-secondary": t("on-secondary"),
          "secondary-container": t("secondary-container"),
          "on-secondary-container": t("on-secondary-container"),
          tertiary: t("tertiary"),
          "on-tertiary": t("on-tertiary"),
          "tertiary-container": t("tertiary-container"),
          "on-tertiary-container": t("on-tertiary-container"),
          error: t("error"),
          "on-error": t("on-error"),
          "error-container": t("error-container"),
          "on-error-container": t("on-error-container"),
          "primary-fixed": t("primary-fixed"),
          "primary-fixed-dim": t("primary-fixed-dim"),
          "on-primary-fixed": t("on-primary-fixed"),
          "on-primary-fixed-variant": t("on-primary-fixed-variant"),
          "secondary-fixed": t("secondary-fixed"),
          "secondary-fixed-dim": t("secondary-fixed-dim"),
          "on-secondary-fixed": t("on-secondary-fixed"),
          "on-secondary-fixed-variant": t("on-secondary-fixed-variant"),
          "tertiary-fixed": t("tertiary-fixed"),
          "tertiary-fixed-dim": t("tertiary-fixed-dim"),
          "on-tertiary-fixed": t("on-tertiary-fixed"),
          "on-tertiary-fixed-variant": t("on-tertiary-fixed-variant")
        },
        borderRadius: {
          sm: "0.125rem",
          DEFAULT: "0.25rem",
          md: "0.375rem",
          lg: "0.5rem",
          xl: "0.75rem",
          full: "9999px"
        },
        spacing: {
          unit: "var(--sp-unit)",
          gutter: "var(--sp-gutter)",
          "margin-mobile": "var(--sp-margin-mobile)",
          "section-gap": "var(--sp-section-gap)"
        },
        maxWidth: {
          "container-max": "var(--sp-container-max)"
        },
        boxShadow: {
          card: "var(--shadow-card)",
          "card-hover": "var(--shadow-card-hover)"
        },
        zIndex: {
          nav: "50",
          raised: "10"
        },
        fontFamily: {
          "headline-xl": ["Geist", "system-ui", "sans-serif"],
          "headline-lg": ["Geist", "system-ui", "sans-serif"],
          "headline-lg-mobile": ["Geist", "system-ui", "sans-serif"],
          "body-md": ["Inter", "system-ui", "sans-serif"],
          "body-lg": ["Inter", "system-ui", "sans-serif"],
          quote: ["Inter", "system-ui", "sans-serif"],
          "label-sm": ["'JetBrains Mono'", "ui-monospace", "monospace"]
        },
        fontSize: {
          "headline-xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
          "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
          "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "600" }],
          "body-lg": ["18px", { lineHeight: "1.7", fontWeight: "400" }],
          "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
          quote: ["20px", { lineHeight: "1.5", fontWeight: "300" }],
          "label-sm": ["12px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "500" }]
        }
      }
    }
  };
})();
