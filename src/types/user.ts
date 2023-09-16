export type User = {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
};

export const userRole = {
    Staff: 1,
    Admin: 2,
} as const;

export type UserRole = (typeof userRole)[keyof typeof userRole];
