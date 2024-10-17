export interface IMaterialsInventoryIndexDB {
  id?: string;
  resources: {
    [materialId: string]: number;
  };
}
