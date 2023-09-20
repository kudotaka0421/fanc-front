import { User } from "@/types/user";

export type Counseling = {
    id: number | null;
    counseleeName: string;
    email: string;
    status: CounselingStatus;
    date: Date | null;
    remarks: string;
    message: string;
    user: User | null;
    selectedSchoolIds: number[] | null;
};

export type CounselingParams = {
    id: number | null;
    counseleeName: string;
    email: string;
    status: CounselingStatus;
    date: string;
    remarks: string;
    message: string;
    userId: number;
    schoolIds: number[] | null;
};

export const counselingsStatus = {
    Ready: 1,
    Completed: 2,
    Canceled: 3,
} as const;

export type CounselingStatus =
    (typeof counselingsStatus)[keyof typeof counselingsStatus];
