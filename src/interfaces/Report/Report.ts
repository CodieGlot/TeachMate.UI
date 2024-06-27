import { Status } from "../../common/enums";
import { ReportSystem } from "./ReportSystem";
import { ReportUser } from "./ReportUser";

export interface Report {
    id: number;
    userId: string;
    reportSystem: ReportSystem | null;
    reportUser: ReportUser | null;
    title: string;
    description: string;
    status: Status.Pending;
}