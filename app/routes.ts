import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/_layout.tsx", [
    index("routes/_index.tsx"),
    route("imprint", "routes/imprint.tsx"),
  ]),
] satisfies RouteConfig;
