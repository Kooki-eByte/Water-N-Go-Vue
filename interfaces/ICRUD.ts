export interface ICRUD {
  getAll: (limit: number, page: number) => Promise<Array<any>>;
  create: (resource: any) => Promise<any>;
  putById: (id: string, resource: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<any>;
}
