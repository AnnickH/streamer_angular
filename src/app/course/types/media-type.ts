import { ModuleType } from './module-type';
import { Typemedia } from './typemedia-type';

export type MediaType = {
  id: number;
  title: string;
  summary: string;
  duration: number;
  //totalTime: String;
  createdAt: string;
  url: string;
  modules: Array<ModuleType>; // pas besoin
  typemedia: Typemedia;
  isSelected: boolean;
};
