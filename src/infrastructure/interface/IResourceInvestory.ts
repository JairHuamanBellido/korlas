export interface IResourceInventoryIndexDB {
  id?: string;
  resources: {
    [materialId: string]: number;
  };
}
