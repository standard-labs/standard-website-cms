import { jsxs, jsx } from "react/jsx-runtime";
import { Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { Main } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { g as getTranslation } from "./index-jI-4ZG0N.mjs";
const HomePage = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Main, { padding: 6, children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Welcome to ",
      formatMessage({ id: getTranslation("plugin.name") })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "This plugin provides additional features to enhance your CMS experience." })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App
};
//# sourceMappingURL=App-DLFnSJNf.mjs.map
