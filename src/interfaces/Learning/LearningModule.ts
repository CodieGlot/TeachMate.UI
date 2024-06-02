import { Subject } from "../../common/enums";

export interface LearningModule {
    id: Int32Array,
    title: string,
    description: string,
    subject: Subject,
    gradeLevel: Int32Array,
    duration: Int32Array,
    createdAt: Date,
    startDate: Date,
    endDate: Date,
    maximumLearners: Int32Array
  }
  