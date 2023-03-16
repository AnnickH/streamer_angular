import { ModuleType } from './module-type';
export interface CourseType {
  id?: number;
  title: string;
  createdAt: string;
  updatedAt?: string;
  objective?: string;
  modules: ModuleType[];
}
