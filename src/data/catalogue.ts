import type { Programme, University } from "./types";
import { su, suProgrammes } from "./universities/su";
import { uct, uctProgrammes } from "./universities/uct";
import { uj, ujProgrammes } from "./universities/uj";
import { ukzn, ukznProgrammes } from "./universities/ukzn";
import { up, upProgrammes } from "./universities/up";
import { wits, witsProgrammes } from "./universities/wits";

export const universities: University[] = [uct, wits, up, su, uj, ukzn];

export const programmes: Programme[] = [
  ...uctProgrammes,
  ...witsProgrammes,
  ...upProgrammes,
  ...suProgrammes,
  ...ujProgrammes,
  ...ukznProgrammes,
];
