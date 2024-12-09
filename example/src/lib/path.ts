export const home = {
  path: "",
  getHref: () => "/",
};

export const error = {
  notFound: {
    path: "*",
    getHref: () => "/not-found",
  },
  serverError: {
    path: "server-error",
    getHref: () => "/server-error",
  },
  forbidden: {
    path: "/forbidden",
    getHref: () => "/forbidden",
  },
};

export const app = {
  root: {
    path: "/app",
    getHref: () => "/app",
  },
  dashboard: {
    path: "",
    getHref: () => "/app",
  },
};

export const paths = {
  home,
  error,
  app,
} as const;
