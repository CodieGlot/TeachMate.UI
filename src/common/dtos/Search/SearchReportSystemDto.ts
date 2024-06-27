import { Status, TypeErrorSystem} from "../../enums";

export interface SearchReportSystemDto {
  typeErrorSystem: TypeErrorSystem | null;
  status : Status | null;
}