import { Subject } from "../../enums";
import { ModuleType } from "../../enums";

export interface SearchClassDto {
  titleOrDesc: string | null;
  subject: Subject;
  gradeLevel: number | null;
  startOpenDate: Date | null;
  endOpenDate: Date | null;
  maximumLearners: number | null;
  moduleType: ModuleType | null;
  numOfWeeks: number | null;
}