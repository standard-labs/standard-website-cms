"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const index = require("./index-DnXWPaoX.js");
const HomePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { padding: 6, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("h1", { children: [
      "Welcome to ",
      formatMessage({ id: index.getTranslation("plugin.name") })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("p", { children: "This plugin provides additional features to enhance your CMS experience." })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
//# sourceMappingURL=App-CcYg2UY0.js.map
