import { UserRole } from "../../enums";

export interface SearchUserDto {
  displayName: string | null;
  name: string | null;
  userRole: UserRole | null;
  isDisable: boolean | null;
}