import { ModuleType } from './module-type';
import { Typemedia } from './typemedia-type';

export type MediaType = {
  id: number;
  title: string;
  summary: string;
  duration: string;
  createdAt: string;
  url: string;
  modules: Array<ModuleType>;
  typemedia: Typemedia;
  isSelected: boolean;
};
