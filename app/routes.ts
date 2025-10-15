import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("cv", "routes/cv.tsx"),
  route("imprint", "routes/imprint.tsx"),
] satisfies RouteConfig;
