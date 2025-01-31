export const noteKeys = {
  all: ["notes"] as const,
  single: (id: string) => ["notes", id] as const,
};
