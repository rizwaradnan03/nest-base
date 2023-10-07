import { User as UserModel } from "@prisma/client";

export class UserEntity implements UserModel {
    id: string;
    username: string;
    password: string;
    email: string;
    isActive: number;
    isDeleted: number;
    roleId: string;
    storeBranchId: string;
}