export type Note = {
  id: string;
  name: string;
  type: string;
  path: string;
  size: number;
  createdAt: Date;
};

export type Analysis = {
  id: string;
  noteId: string;
  rawValue: string;
  filteredValue: string;
};
