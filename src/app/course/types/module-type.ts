import { MediaType } from './media-type';

export interface ModuleType {
  id: number;
  name: string;
  objective: string;
  isSelected: boolean; // add isSelected
  medias: Array<MediaType>;
}
