import { Status, TypeErrorUser} from "../../enums";

export interface SearchReportUserDto {
  typeErrorUser: TypeErrorUser | null;
  status : Status | null;
}