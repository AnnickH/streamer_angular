import { type } from 'os';
import { ModuleType } from './module-type';
export type CourseType = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  objective: string;
  modules: Array<ModuleType>;
  isSelected: boolean;
};
