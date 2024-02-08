export interface Repo<T extends { id: string | number }> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T[]>;
  add(data: Partial<T>): Promise<T[]>;
  update(id: T['id'], updatedItem: Partial<T>): Promise<T[]>;
  delete(id: T['id']): Promise<T[]>;
}
