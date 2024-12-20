export type Note = {
  id: string;
  name: string;
  type: string;
  path: string;
  size: number;
  createdAt: Date;
  analyses?: Analysis[];

  // constructor(
  //   id: string,
  //   name: string,
  //   type: string,
  //   path: string,
  //   size: number,
  //   createdAt: Date
  // ) {
  //   this.id = id;
  //   this.name = name;
  //   this.type = type;
  //   this.path = path;
  //   this.size = size;
  //   this.createdAt = createdAt;
  // }

  // toFile(): File {
  //   // Find the most recent analysis by assuming the latest is the last in the array.
  //   const latestAnalysis = this.analyses?.slice().pop(); // Copy array and get the last item.

  //   // Use the `rawValue` from the latest analysis or provide a default value if no analyses exist.
  //   const rawValue = latestAnalysis?.rawValue || "No analysis available";

  //   // Create a Blob with the rawValue.
  //   const content = new Blob([rawValue], { type: this.type });

  //   // Create a new File object.
  //   return new File([content], this.name, {
  //     type: this.type,
  //     lastModified: this.createdAt.getTime(),
  //   });
  // }
};

export type Analysis = {
  id: string;
  noteId: string;
  rawValue: string;
  filteredValue: string;
};
