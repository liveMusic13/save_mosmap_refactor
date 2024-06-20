import { IFields, ILists, IMaps } from "./slice.types";

export interface AllData {
  fields: IFields[];
  lists: ILists[];
  maps: IMaps[];
}

export interface ExtractedData {
  name?: string;
  type_name?: string;
  namefield?: number;
  nameonmap?: number;
  address?: number;
  mode?: number;
  icon?: number;
  color?: number;
  visible?: number;
}