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
    path: "/",
    getHref: () => "/",
  },
  dashboard: {
    path: "/dashboard",
    getHref: () => "/dashboard",
  },
  notes: {
    path: "/notes",
    getHref: () => "/notes",
  },
  wordcloud: {
    path: "/wordcloud",
    getHref: () => "/wordcloud",
  },
};

export const paths = {
  home,
  error,
  app,
} as const;
