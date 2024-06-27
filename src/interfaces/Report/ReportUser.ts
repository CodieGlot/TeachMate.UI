import { TypeErrorUser } from "../../common/enums";

export interface ReportUser {
    id: number;
    typeErrorUser: TypeErrorUser;
    userIdReported: string;
}