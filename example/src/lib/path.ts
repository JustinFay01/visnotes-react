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
    path: "/app",
    getHref: () => "/app",
  },
  notes: {
    path: "/app/notes",
    getHref: () => "/app/notes",
  },
  wordcloud: {
    path: "/app/wordcloud",
    getHref: () => "/app/wordcloud",
  },
};

export const paths = {
  home,
  error,
  app,
} as const;
